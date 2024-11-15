"use strict";
// import mongoose from 'mongoose';
// import Thought from '../models/Thought' // adjust path as needed
// import User from '../models/User'; // adjust path as needed
// const mongoURI = 'mongodb://localhost:27017/SocialNetworkApp'; // replace with your MongoDB URI
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Database connected.'))
// .catch((error) => console.error('Database connection error:', error));
// // Sample Thoughts
// const thoughts = [
//   {
//       thoughtText: "This is my first thought!",
//       username: "user1",
//       reactions: [
//           {
//               reactionBody: "Great thought!",
//               username: "user2",
//           },
//           {
//               reactionBody: "I totally agree!",
//               username: "user3",
//           },
//       ],
//   },
//   {
//       thoughtText: "Another interesting thought.",
//       username: "user4",
//       reactions: [
//           {
//               reactionBody: "Nice perspective!",
//               username: "user5",
//           },
//       ],
//   },
// ];
// // Sample Users
// const users = [
//   {
//       username: "user1",
//       email: "user1@example.com",
//       thoughts: [], // Will populate with Thought ObjectIds
//       friends: [],  // Will populate with User ObjectIds
//   },
//   {
//       username: "user2",
//       email: "user2@example.com",
//       thoughts: [],
//       friends: [],
//   },
//   {
//       username: "user3",
//       email: "user3@example.com",
//       thoughts: [],
//       friends: [],
//   },
// ];
// // Seed function
// const seedDatabase = async () => {
//   try {
//       // Clear existing documents in the collections
//       await Thought.deleteMany();
//       await User.deleteMany();
//       console.log('User collection cleaned.');
//       console.log('Thought collection cleaned.');
//       // Insert sample thoughts and get their ids
//       const createdThoughts = await Thought.insertMany(thoughts);
//       const thoughtIds = createdThoughts.map(thought => thought._id);
//       // Link thoughts to users
//       users[0].thoughts.push(thoughtIds[0]); // user1 -> first thought
//       users[1].thoughts.push(thoughtIds[1]); // user2 -> second thought
//       // Define friend relationships (optional, example setup)
//       users[0].friends.push(users[1]._id, users[2]._id); // user1 has friends user2 and user3
//       users[1].friends.push(users[0]._id);               // user2 has friend user1
//       // Insert sample users
//       await User.insertMany(users);
//       console.log('Seeding successful!');
//   } catch (error) {
//       console.error('Error seeding database:', error);
//   } finally {
//       mongoose.connection.close(); // Close the connection after seeding
//   }
// };
// // Run the seed function
// seedDatabase();
