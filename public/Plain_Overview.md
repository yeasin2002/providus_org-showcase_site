ICSA – Developer Brief (Plain Overview)
Goal:
Create a simple two-site system that allows churches to join, submit their story and photo/video,
and appear on a public showcase website after approval — all without manual website edits.

1. Two Webpages, One Database
   •There are two websites:
   1.Landing site – where churches sign up and upload their story.
   2.Showcase site – where approved stories appear as cards (with photo/video/text).
   •Both sites use the same Supabase project for all data and files.
2. Landing Site (Join + Story Submission)
   Main pages:
   1.Landing page – explains ICSA and has a Join button.
   2.Join form – collects: Church name, Contact person, Email, Country, Language.
   3.Thank-you page – confirmation message.
   4.Program form – the private page where the church uploads a story, one photo, and
   optionally one video.
   How it works:
   •When someone submits the Join form, the system:
   •Saves their data to Supabase.
   •Creates a private link (token).
   •Sends them an email with that link to the Program form.
   •When they fill the Program form, the data is stored in Supabase with the status
   “submitted.”
3. Showcase Site (Public Display + Admin Review)
   Main pages:
   1.Showcase grid – shows all approved entries as cards.
   •Each card: photo, church name, country, short story, and optional video.
   2.Showcase detail page – opens when clicking a card; shows full story and media.
   3.Admin Review page (private) – for manual approval.

•Shows a list of all submitted entries with thumbnails and text.
•You can open each, check content, and click Approve or Reject.
When you click Approve:
•The entry’s status changes from submitted to approved in Supabase.
•The Showcase website grid automatically shows the new card (no manual edit needed). 4. Basic Flow
1.Church joins on Landing site.
2.They receive an email link to upload story + media.
3.You review and approve on the Showcase site.
4.Approved stories appear publicly as cards. 5. Important Details
•The two sites must connect to the same Supabase project (database + storage).
•Photos/videos should be resized or compressed for fast loading.
•Showcase grid shows only entries with status “approved.”
•Admin Review must be password-protected and private.
•Every uploaded file must be checked for type and size (for safety).
•The Showcase must support multiple languages , including right-to-left ones like Arabic.
•Make sure when an entry is approved, the Showcase updates quickly (avoid long cache
delays).
•Public pages never show church email addresses or personal contact info. 6. Deployment
•Both sites hosted on Vercel (or Netlify).
•Landing domain example: icsa.church
•Showcase domain example: voices.icsa.church
•Both point to the same Supabase project.
•Email system (e.g., Brevo) handles the automatic message with the private upload link.

## Dashboard

a basic dashboard so that admin can see and approve all Church and do other actions
