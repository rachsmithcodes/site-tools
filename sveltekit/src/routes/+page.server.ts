const serverAddress = "http://localhost:3000";

export async function load({ locals: { netlify } }) {
  let serverIsOnline;
  try {
    serverIsOnline = await fetch(serverAddress).then((res) => res.ok);
  } catch (error) {
    serverIsOnline = false;
  }
  const submissions = await netlify.listSiteSubmissions({
    site_id: "4321938e-499f-4b63-90a1-8a5ef371c0a5",
  });

  return {
    submissions,
    serverIsOnline,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  approveComment: async ({ request, locals: { netlify } }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const slug = formData.get("slug");
    const name = formData.get("name");
    const website = formData.get("website");
    const comment = formData.get("comment");
    const created = formData.get("created");

    try {
      await fetch("http://localhost:3000/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, id, name, website, comment, created }),
      });
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(error.message);
    }

    await netlify.deleteSubmission({
      site_id: "4321938e-499f-4b63-90a1-8a5ef371c0a5",
      submission_id: id,
    });
  },
  deleteComment: async ({ request, locals: { netlify } }) => {
    const formData = await request.formData();
    const id = formData.get("id");

    await netlify.deleteSubmission({
      site_id: "4321938e-499f-4b63-90a1-8a5ef371c0a5",
      submission_id: id,
    });
  },
};
