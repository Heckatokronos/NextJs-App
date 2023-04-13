import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  async function addNewMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.replace("/");
  }

  return (
    <>
      <Head>
        <title>Новая заметка</title>
        <meta name="description" content="новая заметка, круто-классно " />
      </Head>
      <NewMeetupForm onAddMeetup={addNewMeetupHandler} />
    </>
  );
}

export default NewMeetupPage;
