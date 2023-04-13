import Head from "next/head";
import { MongoClient } from "mongodb";
import { URL } from "../api/api";

import MeetupList from "../components/meetups/MeetupList";

function MeetupHome(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="какой-то текст, лол" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(URL);
  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default MeetupHome;
