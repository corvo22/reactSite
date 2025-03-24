- - -
### Key Identification Using Machine Learning

Since I started at Drexel, I have been interested in the overlap between music and computer science. At first I was interested in using AI generation, but I have since soured on that, then I was looking at the mathematical sides behind music and then it hit me. Lately, when playing bass and looking at the keys given for a specific song by sites like https://tunebat.com/ and https://tabs.ultimate-guitar.com/ I kept seeing that the keys given do not line up with what I hear or that the keys given are not consistent across versions. With that in mind
- - -
### Part 1: Data Collection
I started looking at key identification using Machine Learning and wanted to see if there was anyone who've done similar. Sadly, there's not much out there on anything lower than a very high academic level. Spotify likes to keep it's secrets ... here are the papers
* What's Key for Key? The Krumhansl-Schmuckler Key-Finding Algorithm Reconsidered 
* Detecting Musical Key with Supervised Learning<
* Development of an intelligent model for musical key estimation using machine learning techniques
Great, but what the hell do these papers mean? What use are they to me, or to anyone? what can we pull out from them, that vein of gold burried deep, that kernel around which we can build and build and buld like the speck of dust at a center of a raindrop? To the best of my ability, it can but sumarised as follows:
* Music, like all sounds, is quantifiable as a series of waves. We use hertz for this measure
* Sadly, due to overtones and interference, hitting one note does not trigger just one note and noise is a big issue
* We can use short time fourier transforms and a whole lot of frequency filtering to clean up the noise as best as possible and match the note to its expected frequency AND velocity
* We then can cut this into sections (say 30s-1m) and then average the velocity and occurance of each note over said time to get an average chroma-vector
* The chroma-vector forms the basis for all of the machine learning algorithms. It (and the key) are the inputs
- - -
Ok cool. So now it's a day later. I spent too much time and (finally) have a working database that promises to be varied enough and wont 1. cost me monies or 2. require me to like do individual dowloads or map the keys myself. It's important to have a verified basis of truth. Bad part. It's all in .abc files. .abc is a very old file type from the 1990s and 2000s used to write music in ASCII. It was mostly used for traditional folk songs. Luckily, (after WAY too many broken links) I found a converter in c to do this for me, but hey. I know c, I know python. I'll be back after I make a converter.
&nbsp;  
![an abc conversion tool](/keyImages/converter.png)  
&nbsp; 
- - -
It's the next day now. Some bad news everyone! The database was seemingly not as varried as implied. I was looking through the files and did some basic just like checkwork and the amount of each key seemed a little off. Some keys seems to be very heavily represented, so I did more investigation using grep and wc and found out bad news! Nearly half the possible keys are not in the dataset! How dare the internet lie to me! This is annoying ugghghh. Now what.
So. New plan. Let's look at the top 15 songs in each non-theoretical key (for non music nerds, that means keys that are realistically played).Get mp3s for each, then slice them into 30 second blocks and remove percussive features, normalise, and filter, then use. Now for how I am gonna get these as mp3s (or oog, or flac, or wav)...
- - -
Finally, three days later, I've got enough data. It was VERY tedious and annoying to try to find mp3s. Let's not ask questions but I have all the data needed. I processed this data as follows: I first labeled the file with a separator and key information then I created a function called processMp3Data(dir) which takes the mp3 file directory and creates a matrix representation with each row representing a thirty second snipit of an audio file with the last feature as the labeled key, and the rest as the average chroma-vector over that period. The code for this function and explanation is below.
* Create a dummy matrix to start then begin a loop for every file in the mp3 directory
* Find the key from the song title using regex, filter out noise and percussion, and create the chromagraph
* For each 30s song chunk, grab that slice from the chromagraph matrix, then calculate the average chromavector
* Add the key to this chromavector to create the feature vector and stack it onto the dummy matrix
&nbsp;  
![processing mp3 data to chroma vectors](/keyImages/processMP3.png)  
&nbsp; 

- - -
Now that we have the data in a digestable format, there's one small tweak and one large tweak left before we can use it for machine learning. An old phrase a prof told me is Machine Learning is 20% statistics, 20% linear alg, and 60% just getting the data to where you need it. Anyways...  

The simple tweak is that instead of A, Ab, Abm, etc for keys they need to be given as numbers, just for ease of processing en mass with numpy. I just threw the results of the above function into a pandas dataframe and exported that as a csv, then used mass edits in my csv editor of choice.  

The more complicated one is that well 24 dimmensional data is not very easy to work with. Some machine learning algos behave badly with high dimmensions, some just get much more computationally intense, and while I am doing this on a fairly beefy PC and not a TON of data, 1392 datapoints with 24 features... it'll be for the best. Moreover, I am not sure yet on which dimmension we will perform best, if any from reduction. If I was to use Krumhansl's algorithm, then of course reduction would not be beneficial, but we are exploring the use of machine learning for key classification, so we need to apply machine learning logic.  

To reduce the number of features per entry while preservince class separation, we must use Linear Discriminant Analysis. Details of LDA can be found elsewhere.
- - -
### Part 2: Sanity Checks
- - -
Now that we have a modestly sized dataset, a way of processing that dataset into a digestable format, and implemented Linear Discriminant Analysis, let's do some sanity checking.  

First things first, splitting the data into testing and training. When creating a model agent, it is important that one does not train directly on the test set, and that the test set is robust. There are many techniques and splits to increase the efficacy of training, extend the use of the data, and increase generalisation, but due to time constraints I am simply doing 3/4 training 1/4 testing.  

The sanity check comes from needing to do some splits in the data. Firstly, the data needs to be shuffled about. To ensure the same shuffling occurs each time, we can use np.random.seed(). Then, we must not lose the labels while shuffling, but specifically lose them to do LDA. Ordering is important. Finally, just for graphability, multiplying by a scalar. To ensure everything in this processing step moves properly, I performed a variety of prints during developement and cross-referenced with the csv file.  

Next, I want to ensure that before even attempting any machine learning model implementations there is a good class separation within the data. While I expect separation to decrease as more classes are introduced (looking at you all 24), the distribution of notes in each key and Krumhansl's observations both point to the fact that clear separation should exist. Noteably, splitting the songs into 30 second chunks, modulation within songs, and the simplification to major and minor modes instead of the whole series of modes means that, in addition to outliers, it is a good idea to check if the expected separation is maintained. To do so, I reduced the dataset to 3D and graphed classes against eachother. In the images below are the key of A major, mapped as key 0, as compared to its parallel minor, chromatic neighbor, and dominant key. Separation was maintained in all cases.  

&nbsp;  
![processing mp3 data to chroma vectors](/keyImages/A_vs_Am.png)  
&nbsp; 

&nbsp;  
![processing mp3 data to chroma vectors](/keyImages/A_vs_ASharp.png)  
&nbsp; 

&nbsp;  
![processing mp3 data to chroma vectors](/keyImages/A_vs_E3.png)  
&nbsp; 

&nbsp;  
![processing mp3 data to chroma vectors](/keyImages/A_vs_All.png)  
&nbsp; 

Future Ky chiming in! Later I'll learn that this shows two very important things. First off, **KNN is probably not the most suited algorithm for this dataset, or at least when reduced with LDA and especially due to KNN's sensitivity to outliers**, and that an algorithm that divides based on hyperplanes, such as SVM (just like the papers said) is possibly a great fit. At this point, I did not realise that and spent MANY hours and multiple days trying to figure out what was so wrong, it also did not help there was a bug in my first KNN attempt causing a feature to be ignored...
- - -
### Part 3: KNN
- - -

When I read the papers, I was surprised that none attempted KNN, as it seemed to be a decent analog to the KK-profiles. The idea behind this being twofold: If a song was in a given key, it should not be that far apart from other songs in that key when quantified as chroma-vectors, which follows from that all songs in a key should be closer in distance to it's KK-profile than the KK-profile of another key. This logic also applies to why the papers attempted SVM based classification. However, due to limited time, as I am doing this over Drexel's painfully short, and my surprisingly busy, winter break, I am starting with KNN. KNN stands for K Nearest Neighbors which provides a great explanation for the core of the algorithm. KNN takes all points in the training set, and for each point in the validation set, looks at the k nearest points in the test set and values a consensus from among them as to how to lable the new point. Remarkably, geniously simple. However, what does distance really mean? There are dozens of distance functions, and euclidian distance really starts breaking down when dimmensions go beyond 4 or 5. And every point in the train set, for every point in the test set? That's a lot of computational load! These are the downsides of KNN.   
&nbsp;  

The code for KNN is pretty simple then, two for loops to go through the data points, another to calculate distance, and finally checking the neighbors. There are a couple of tricks, however.  

* sort by lambda x: Since each entry is itself an array, dist_list ends up as a 2d array. To quickly sort this, we can use sort's key param and lambda x as x[0] to sort along the dist_list[[distance,entry]] distance axis
* distance function: The distance function chosen in KNN can make a huge difference. For now I am trying euclidian distance, the distance we all did in middle school until I know everything works, then I will experiment different ones
* confusion matrix sets: Rather than manually looping over the opinions, one can use a little trick with sets and python. int(max(set(opinions, key=opinions.count) means that, by converting to a set based on the count of each opinion, we can easily just grab the consensus. For ties, the lowest number key comes first, so A, then Am
&nbsp;  

The code for KNN all put together is down below. The confusion matrix code is the only part that is somewhat complicated. Oh. Yes. Confusion Matrices are a thing. They're simple a larget feature x feature table that counts the number correct on the diagonal and the number wrong, but confused for what, along the vertical. It is a great tool for seeing if a class is being confused, or misclassified as another.

&nbsp;  
![processing mp3 data to chroma vectors](/keyImages/knn.png)  
&nbsp; 
- - -
### Part 4: Hyperparameters
- - -
Just because we can use KNN now does not mean that we are done. KNN has a few hyperparameters, as does preprocessing, as does LDA

* K : How many neighbors to look at?
* LDA : How many dimmensions? Is reduction good?
* Train/Test Split : 2/3, 3/4, 4/5 are all normal splits, which performs best?
* Distance : What distance function performs best?
* 30 seconds : Was 30 second chunks a good choice? Would longer be better?

While I'd like to explore all of these questions, lets start with the first three. After a lot of trial and error, I found that the lower I went with LDA, the worse I got, but running one pass with LDA at full 24D was still beneficial by about a three percent difference in accuracy. All I did to test this was run a for loop from 1 to 24 inclusive, one for each version of LDA, and compared their relative accuracies.  

For k, I did similar and found, as expected, that the sensitivity to outliers and breakdown of separation when comparing the whole 24 classes to eachother influenced KNN greatly. A k=5 provided the best results.  

 Training splits did not have much affect either way, so I stuck with a 3/4 1/4 split.  

 The final accuracy with these hyperparameters was around 67%, some further experimenting pushed us to 69% which I am quite pleased with. Below Is an image showing the confusion matrix with class labels. I believe the results could be improved through another method, such as SVMs or using QDA. I also imagine there would be much benefit in increasing the database size. I am also interested what effect extending the timeframe from 30s to 1m and/or changing the distance formula would have.  

&nbsp;  
![processing mp3 data to chroma vectors](/keyImages/confusion_matrix.png)  
&nbsp; 