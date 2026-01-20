# Resume Editor Guide

## Overview
The Resume Editor is a comprehensive tool for creating, editing, and downloading professional resumes. It features a clean, modern interface with real-time preview functionality.

## Features

### 1. **Resume Templates** (`/student/templates`)
- Browse 8 professionally designed resume templates
- Filter templates by category (All templates, Word, Simple, Picture, ATS, Two-column, Google Docs)
- Preview templates before selection
- Download templates as PDF or DOCX

**Accessing Templates:**
```
/app/student/templates/page.tsx
Route: /student/templates
```

### 2. **Resume Editor** (`/student/resume-editor`)
- Edit multiple resume sections in a single interface
- Real-time preview mode
- Add/remove entries for each section
- Download as PDF or DOCX

**Features:**

#### Personal Information
- Full Name
- Email
- Phone Number
- Location
- Professional Summary

#### Work Experience
- Company Name
- Position/Job Title
- Duration (start - end)
- Job Description
- Add/Remove multiple experiences

#### Education
- School/University Name
- Degree
- Graduation Year
- Add/Remove multiple entries

#### Skills
- Add skills individually
- Press Enter to add a new skill
- Click × to remove a skill
- Skills display as tags with different colors

#### Preview & Download
- **Preview Mode**: Toggle between Edit and Preview to see formatted resume
- **Download PDF**: Exports resume as PDF (A4 size)
- **Download DOCX**: Placeholder for Word document export

## Usage Flow

### Step 1: Choose a Template
1. Navigate to `/student/templates`
2. Browse available templates
3. Click "Select" or "Use This Template" button
4. Preview the template before using

### Step 2: Edit Your Resume
1. Navigate to `/student/resume-editor`
2. Fill in personal information
3. Add work experience, education, and skills
4. Use the Preview button to see your resume formatted

### Step 3: Download
1. Click "Download PDF" to save as PDF file (A4 paper size)
2. Or click "Download DOCX" for Word document (coming soon)

## Technical Details

### Keyboard Shortcuts
- **Enter** in Skills field: Add new skill
- **Delete/×** button on skills: Remove skill
- **Edit/Preview** toggle: Switch between editing and viewing

### Data Structure

**Personal Info:**
```typescript
{
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
}
```

**Experience:**
```typescript
{
  company: string
  position: string
  duration: string
  description: string
}[]
```

**Education:**
```typescript
{
  school: string
  degree: string
  year: string
}[]
```

**Skills:**
```typescript
string[]
```

## Browser Compatibility
- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support

## Notes
- All data is stored in component state (not persisted)
- PDF export uses browser's print functionality for A4 format
- DOCX export feature coming soon
- Resume preview is optimized for printing to PDF

## Troubleshooting

### PDF not downloading?
- Check browser's pop-up blocker settings
- Ensure JavaScript is enabled
- Try a different browser

### Fields not saving?
- Refresh the page (all data will be reset)
- Try clearing browser cache
- Check browser console for errors

## Future Enhancements
- [ ] Cloud storage integration
- [ ] DOCX export functionality
- [ ] More template designs
- [ ] Export to Google Docs
- [ ] Share resume via link
- [ ] Multi-language support
