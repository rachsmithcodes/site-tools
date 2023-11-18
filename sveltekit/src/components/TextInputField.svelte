<script lang="ts">
  export let label: string;
  export let name: string;
  export let value: string;
</script>

<div class="flex mb-5">
  <label class="bg-purple-700 text-white px-3 py-1 rounded-l-lg" for="created"
    >{label}</label
  >
  <input
    class="bg-white px-3 py-1 rounded-r-lg border border-1 border-slate-200"
    {name}
    type="text"
    {value}
  />
</div>
