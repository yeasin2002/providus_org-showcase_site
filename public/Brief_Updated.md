1ICSA – International Church Support Alliance
Section 1 - Project Summary
ICSA is a simple online platform that helps churches share their missions with the world.
It is a completely free tool — created to support local ministries, increase visibility, and help 
donors or partners discover them directly.
Each church can:
1. Join easily online by filling a short form.
2. Create a small public profile with their story, mission description, photo, and optional 
video.
3. Be listed on the ICSA site, where visitors and donors can read about their work and contact 
them directly.
The system does not handle donations or payments — it only connects churches with potential 
supporters.
ICSA’s role is to provide the platform and visibility, not to act as a middleman.
The system runs under the official domain icsa.church
Developer Notice
This system for ICSA (icsa.church) is also a pilot project for a larger platform planned later.
We chose certain tools and logic with future scaling in mind.
If the work on ICSA is successful, the same developer will be invited to build the next, more 
advanced system.
Section 2 - What’s In / What’s Out
What’s Included in This Project
 A minimal Join form (church name, contact person, email, country).
 After submitting, each church receives a Welcome email with a unique private link.
 Using that link (no login needed), the church can write about its mission/project, upload a 
photo and optional video.
 The admin reviews each project and manually approves it before it appears publicly.
 Approved projects are displayed on voices.icsa.church, showing:
 Church name
 Mission description

2 Photo / video
 Contact link
 When a project is approved, the system automatically creates and emails a unique 
Certificate (PDF) confirming that the church is part of ICSA.
 Simple Admin Review page to view, edit, approve, or reject projects.
 Data and files stored in Supabase.
 Sites hosted on Vercel.
What’s Not Included
 ❌ No referral or invite system.
 ❌ No payment or donation handling.
 ❌ No permanent user accounts or passwords.
 ❌ No detailed analytics or marketing tools.
 ❌ No mobile app — web only.
Section 3 - Domain Map
Main Domains
Purpose Address Description
Join icsa.churchChurches learn about ICSA and fill the Join form. 
After joining, they receive a private link by email 
to submit their mission story, photo, and video.
Public Stories Site 
(Voices)voices.icsa.churchPublic website where approved church projects 
appear as cards. Visitors can read stories, see 
photos/videos, and contact churches directly.
Admin Review 
Pagevoices.icsa.church/admi
nPrivate page for ICSA team to review, edit, and 
approve new submissions before they go public.
Certificate 
Verificationvoices.icsa.church/certifi
cate/CERT123Public page for verifying a church’s membership 
certificate by its unique ID.
Notes for Developer
 All domains use the same Supabase project for data and file storage.
 When a project is approved, the public page on voices.icsa.church updates automatically.
 Emails and certificate links always use the same domain set for consistency.

3Section 4 - User Flow (End to End)
1￿⃣ Join Form (join.icsa.church)
 A church fills out a very short form:
 Church name
 Contact name
 Email
 Country
 The system saves the data in Supabase and marks the status as “joined.”
2￿⃣ Welcome Email
 The system sends a Welcome email immediately after submission.
 The email includes:
 A thank-you message
 A unique private link (token) to submit their mission/project
 A note that no login is required — the link itself grants access
3￿⃣ Project Submission Page (private link)
 The church opens the private link and fills in a short Project form, adding:
 Project title / mission description
 One photo (required)
 One video (optional)
 When submitted, it’s saved in Supabase with the status “pending approval.”
4￿⃣ Admin Review (voices.icsa.church/admin)
 The ICSA admin logs in to the private review page.
 Each pending project appears as a small preview card with text, image, and “Approve” or 
“Reject” buttons.
 The admin can open full details to check or edit before approving.

45￿⃣ Approval
 When the admin clicks Approve, the project’s status becomes “approved.”
 The project automatically appears on the public site voices.icsa.church as a card with photo, 
text, and optional video.
 A Certificate (PDF) is generated and emailed to the church automatically.
6￿⃣ Public View (voices.icsa.church)
 Visitors can browse all approved projects.
 Each card links to a detail page with the full story, images, and optional video.
 Visitors can contact the church directly using the church’s provided link or email (optional 
field).
Section 5 - Data & Files
Where data is stored
All information, photos, and videos are stored in Supabase — one shared project for both 
icsa.church and voices.icsa.church.
Main tables
Table name What it stores
churches Basic info from the Join form
projectsMission stories submitted through the private link (title, text, photo/video links, 
status: pending / approved / rejected).
certificatesAuto-generated record for each approved project (certificate ID, issue date, link to 
PDF).
File storage (Supabase Buckets)
Folder Purpose
uploads/ Photos and videos uploaded by churches.
certificates/ PDF certificates generated after approval.
Data connection
 Both sites read and write to the same Supabase database.
 The public site (voices.icsa.church) only loads entries marked approved.

5 The admin page updates project status to approved or rejected.
 File URLs (photo, video, PDF) are automatically attached to the related record
Section 6 - Emails
Email platform
All system emails are sent through Brevo.
The system uses simple templates — no complicated automation or tracking.
When emails are sent
Step Trigger Recipient Purpose / Content
1. After Join 
FormA new church 
submits the join 
form.Church 
contact emailWelcome email — thanks them for joining 
and includes their private link to submit their 
mission/project (no login required).
2. After Admin 
ApprovalAdmin clicks 
“Approve” in the 
review panel.Church 
contact emailApproval email — informs them their 
project is now live on the public site, and 
includes their certificate PDF as an 
attachment or link.
3. Rejection 
EmailAdmin clicks 
“Reject.”Church 
contact emailPolite note explaining the submission was not 
approved and how to edit or resend 
(optional).
Email design
 Simple, text-based or light HTML.
 Each email includes the ICSA logo and the domain icsa.church for trust.
 All text is in English
 Links use the correct domain (either join.icsa.church or voices.icsa.church).
Developer Notes
 Store each email template in Brevo.
 Supabase triggers the correct template at each step.
Section 7 - PDF Certificate

6Purpose
Each approved church automatically receives a Membership Certificate (PDF) confirming that its 
project is part of ICSA.
The certificate is both symbolic (recognition) and practical (for donors or partners).
When it’s created
 Automatically generated after Admin approval of a project.
 The certificate record is saved in Supabase and linked to the church’s entry.
What it contains
 ICSA logo and name
 Church name
 Project or mission title
 Certificate ID (unique code)
 Approval date
 Signature line (digital)
Where it’s stored
 The PDF file is saved in the Supabase certificates/ folder.
 The record includes:
 certificate_id
 church_id
 file_url
 issued_at (timestamp)
Email delivery
 After approval, the church automatically receives the certificate by email:
 A link to download it.
Section 8 - Media Rules

7Overview
Churches can upload one photo (required) and one video (optional) with their project submission.
The goal is to keep uploads easy, safe, and lightweight so pages load quickly even on slow 
connections.
Photo Guidelines
 Required: one main photo.
 Maximum size: 5 MB.
 Accepted formats: JPG, PNG, or WebP.
 Automatically resized and compressed after upload for faster display.
 Stored in Supabase under uploads/ and linked to the project record.
Video Guidelines
 Optional field.
 Two options:
1. Upload a short video (maximum 50 MB, around 1 minute).
2. Or provide an unlisted YouTube or Vimeo link instead of uploading.
 Videos do not autoplay on the public site — they load only when the visitor clicks “Play.”
 Video files (if uploaded) are stored in Supabase under uploads/.
Display Rules
 Public pages (voices.icsa.church) show photos as optimized thumbnails and load 
them lazily (only when visible).
 Video thumbnails or embedded players appear only on the project’s detail page.
 If a project is not approved, its files remain private and invisible to visitors.

8Section 9 - Languages
Current project
 English only.
 All pages, emails, and admin tools will ship in English.
Future-ready (for next project / later add-ons)
 Build text as replaceable labels (not hard-coded), so adding languages later is easy.
 Keep a simple language file structure ready (e.g., en.json) even if only English is used 
now.
Bottom line
 Ship English now.
 Be ready to plug in more languages later without rebuilding.
Section 10 - Admin Review Tool
Purpose
Review new church projects, make small edits if needed, then Approve (goes public) or Reject 
(stays hidden).
Location
 voices.icsa.church/admin
What you can do
 See pending projects in a simple list with photo, title, church name, country, date.
 Open a project to read full text and view media.
 Edit minor text (typos, short fixes) before approval.
 Approve → project appears on voices.icsa.church instantly.
 Reject → stays hidden; (optional) add a short reason.
 Unpublish (optional) → hide a project that was already approved.
 Preview public page before approving.
 Send emails automatically on approve (and optionally on reject).

9After you click Approve
 Status changes to approved.
 The project shows on the public site (card + detail page).
 A certificate PDF is created and the Approval email is sent with the link.
Nice-to-have extras
 Search and filters (by country, date, status).
 Bulk actions (approve/reject multiple).
 Notes field (internal, not public).
 Refresh public list right after approval so it appears immediately.
Section 11 - Deployment Plan
Hosting
 Both sites will be hosted on Vercel (recommended) or Netlify.
Site Domain Purpose
Join site icsa.church Churches join and submit projects.
Showcase 
sitevoices.icsa.church Public projects + Admin Review tool.
Database & Files
 Both sites connect to one Supabase project for:
 Database tables (churches, projects, certificates)
 File storage (uploads and certificates folders)
Email Platform
 Brevo handles all system emails.
 Developer will set API keys for live sending.
Domains & DNS
 Add subdomains voices in the DNS panel of icsa.church.
 Point them to Vercel’s servers.
 Use SSL (HTTPS) on both sites.
Deployment process
1. Developer prepares both sites locally and connects to Supabase.

102. Test all flows (join, email, submission, approval).
3. Deploy join site first, then voices site.
4. Final test on live domains.
5. Turn off any test/demo data before launch.
Section 12 - Launch Checklist
Before launch
☐ Both domains — join.icsa.church and voices.icsa.church — are live and secured 
with HTTPS.
☐ DNS records verified and pointing correctly to hosting (Vercel/Netlify).
☐ Supabase project connected and database tables created (churches, projects, 
certificates).
☐ Email API keys (Brevo or MailerLite) added and tested.
☐ Upload and certificate folders exist in Supabase (uploads/, certificates/).
☐ Figma designs fully implemented and reviewed visually.
Functionality
☐ Join form submits successfully and shows Thank-You page.
☐ Welcome email sends automatically with a working private link.
☐ Private project submission form works and uploads media correctly.
☐ Admin Review tool lists all pending submissions.
☐ Approve button publishes instantly to the public site.
☐ Approval email (with certificate) sends correctly.
☐ Rejected projects stay hidden from public view.
☐ Public site loads only approved entries and displays media properly.
Content and text
☐ All public text finalized and proofread in English.
☐ All buttons and labels match the Figma design.
☐ Privacy and contact info included in the footer.
☐ Test data removed; only real approved entries remain visible.

11Speed and usability
☐ Pages load quickly (under 3 seconds on 4G).
☐ Photos are optimized; videos click-to-play.
☐ Works smoothly on phones, tablets, and computers.
☐ Scroll, forms, and buttons behave correctly on all devices.
Final checks
☐ Certificate verification page works.
☐ Error pages show clear, friendly messages.
☐ Backups and restore method tested once.
☐ All test emails and links verified again.
☐ Team walk-through done from start to finish.