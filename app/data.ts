type Project = {
	name: string;
	description: string;
	link: string;
	video?: string;
	image?: string;
	id: string;
};

type WorkExperience = {
	company: string;
	title: string;
	start: string;
	end: string;
	link: string;
	id: string;
};

type BlogPost = {
	title: string;
	description: string;
	link: string;
	uid: string;
};

type SocialLink = {
	label: string;
	link: string;
};

type CourseNote = {
	semester: string;
	name: string;
	description: string;
	link: string;
	pdfUrl: string;
	gradientColors: [string, string, string, string];
	id: string;
};

export const PROJECTS: Project[] = [
	{
		name: "Ask Ed",
		description:
			"Ed Discussion, faster, better, and more efficient then ever. Coming soon.",
		link: "",
		image: "/ask-ed.png",
		id: "project1",
	},

];

export const WORK_EXPERIENCE: WorkExperience[] = [
	{
		company: "Reglazed Studio",
		title: "CEO",
		start: "2024",
		end: "Present",
		link: "https://ibelick.com",
		id: "work1",
	},
	{
		company: "Freelance",
		title: "Design Engineer",
		start: "2022",
		end: "2024",
		link: "https://ibelick.com",
		id: "work2",
	},
	{
		company: "Freelance",
		title: "Front-end Developer",
		start: "2017",
		end: "Present",
		link: "https://ibelick.com",
		id: "work3",
	},
];

export const BLOG_POSTS: BlogPost[] = [
	{
		title: "Nothing particular for now.",
		description: "",
		link: "/",
		uid: "blog-1",
	},
	
];

export const SOCIAL_LINKS: SocialLink[] = [
	{
		label: "Github",
		link: "https://github.com/elazdi-al",
	},
	{
		label: "X",
		link: "https://x.com/elazdi_al",
	},
];

export const EMAIL = "ali.elazdi@epfl.ch";

export const COURSE_NOTES: CourseNote[] = [
	// BA4 Semester
	{	
		semester: "BA4",
		name: "IML - Summary",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/ML-Summary/main/main.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/ML-Summary/main/main.pdf",
		gradientColors: ["#667eea", "#764ba2", "#667eea", "#a8d8ea"],
		id: "course0",
	},
	{
		semester: "BA4",
		name: "Computer Systems",
		description: "",
		link: "https://elazdi-al.github.io/compsys/",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/compsys/main/compsys.pdf",
		gradientColors: ["#667eea", "#764ba2", "#6fa8dc", "#9fc5e8"],
		id: "course1",
	},
	{
		semester: "BA4",
		name: "Computer Systems - Midterm CheatSheet",
		description: "",
		link: "https://elazdi-al.github.io/compsys/",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/compsys-cheatsheet/main/cheatsheet.pdf",
		gradientColors: ["#a8e6cf", "#88d8c0", "#78c2ad", "#68ac98"],
		id: "course2",
	},
		{
			semester: "BA4",
			name: "Computer Systems - Final CheatSheet",
			description: "",
			link: "https://elazdi-al.github.io/compsys/",
			pdfUrl: "https://raw.githubusercontent.com/elazdi-al/compsys-cheatsheet-final/blob/main/cheatsheet.pdf",
			gradientColors: ["#ffd3a5", "#fd9853", "#ee9ca7", "#ffdde1"],
			id: "course3",
		},
	{
		semester: "BA4",
		name: "Algorithm I: Midterm Cheatsheet",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/algorithms-cheatsheet/main/algorithms.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/algorithms-cheatsheet/main/algorithms.pdf",
		gradientColors: ["#4facfe", "#00f2fe", "#43e97b", "#38f9d7"],
		id: "course4",
	},
	{
		semester: "BA4",
		name: "Algorithm I: Final Cheatsheet",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/algorithms-cheatsheet/blob/cheatsheet-final/algorithms.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/algorithms-cheatsheet/blob/cheatsheet-final/algorithms.pdf",
		gradientColors: ["#ee5a24", "#feca57", "#ff9ff3", "#54a0ff"],
		id: "course5",
	},

	// BA3 Semester
	{
		semester: "BA3",
		name: "Analysis III: Distribution Theory",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/DistributionTheory/main/main.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/DistributionTheory/main/main.pdf",
		gradientColors: ["#fa709a", "#fee140", "#ffecd2", "#fcb69f"],
		id: "course6",	
	},
	{
		semester: "BA3",
		name: "Computer Architecture",
		description: "",
		link: "https://elazdi-al.github.io/comparch/",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/CheatSheetAnalyseIII/main/cheatsheet.pdf",
		gradientColors: ["#5f27cd", "#00d2d3", "#ff9ff3", "#341f97"],
		id: "course7",
	},
	{
		semester: "BA3",
		name: "Analysis III: Cheatsheet",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/CheatSheetAnalyseIII/main/cheatsheet.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/CheatSheetAnalyseIII/main/cheatsheet.pdf",
		gradientColors: ["#fa7671", "#ffa8a5", "#ffc3a0", "#f9e9df"],
		id: "course8",
	},

	// BA2 Semester
	{
		semester: "BA2",
		name: "Fundamentals of Digital Systems",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/FDS/main/modified_fds.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/FDS/main/modified_fds.pdf",
		gradientColors: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
		id: "course9",
	},
];
