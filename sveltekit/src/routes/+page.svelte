<script lang="ts">
  import "../app.css";
  import CommentSubmission from "../components/CommentSubmission.svelte";

  export let data;

  const submissions = data.submissions;
  const serverIsOnline = data.serverIsOnline;
  console.log(submissions);
</script>

<main class="container mx-auto text-lg">
  <h1 class=" font-bold text-2xl my-5">Comments</h1>
  {#if !serverIsOnline}
    <p
      class="bg-red-100 border border-red-400 text-red-700 px-3 py-2 mb-5 rounded relative"
    >
      Comments server is offline!
    </p>
  {/if}

  <p class="bg-white px-3 py-2 mb-5 rounded-lg">
    You have {submissions.length}
    {submissions.length === 1 ? "comment" : "comments"} to approve
  </p>
  {#each submissions as submission}
    <CommentSubmission {submission} />
  {/each}
</main>

<style>
</style>
