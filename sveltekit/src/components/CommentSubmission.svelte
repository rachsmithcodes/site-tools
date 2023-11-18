<script lang="ts">
  import TextInputField from "../components/TextInputField.svelte";
  import ApproveButton from "./ApproveButton.svelte";
  import DeleteButton from "./DeleteButton.svelte";

  export let submission: {
    id: string;
    created_at: string;
    data: {
      slug: string;
      name: string;
      url: string;
      comment: string;
    };
  };
</script>

<div
  class="bg-slate-50 shadow-xl py-4 px-4 mb-5 pattern-dots pattern-blue-500 pattern-bg-white
    pattern-size-6 pattern-opacity-20 rounded-lg"
>
  <form method="POST" action="?/approveComment">
    <div class="flex mb-5">
      <span class="bg-purple-700 text-white px-3 py-1 rounded-l-lg">post</span
      ><a
        class="bg-white px-3 py-1 rounded-r-lg border border-1 border-slate-200 underline underline-offset-2"
        href={`https://rachsmith.com/${submission.data.slug}`}
      >
        {submission.data.slug}
      </a>
    </div>
    <input hidden value={submission.data.slug} name="slug" />
    <input hidden value={submission.id} name="id" />
    <TextInputField
      label="created at"
      name="created"
      value={submission.created_at}
    />
    <TextInputField label="name" name="name" value={submission.data.name} />
    <TextInputField
      label="website"
      name="website"
      value={submission.data.url ?? ""}
    />
    <div>
      <textarea
        name="comment"
        class="w-full h-auto px-3 py-1 border border-slate-200 rounded-lg"
        rows="5">{submission.data.comment}</textarea
      >
    </div>
    <div>
      <ApproveButton />
      <DeleteButton />
    </div>
  </form>
</div>
