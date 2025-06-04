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
		name: "Introduction to Machine Learning - Summary",
		description: "",
		link: "https://github.com/elazdi-al/ML-Summary/blob/main/main.pdf",
		pdfUrl: "https://github.com/elazdi-al/ML-Summary/blob/main/main.pdf",
		gradientColors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
		id: "course0",
	},
	{
		semester: "BA4",
		name: "Computer Systems",
		description: "",
		link: "https://elazdi-al.github.io/compsys/",
		pdfUrl: "https://github.com/elazdi-al/compsys/blob/main/compsys.pdf",
		gradientColors: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
		id: "course1",
	},
	{
		semester: "BA4",
		name: "Computer Systems - Midterm CheatSheet",
		description: "",
		link: "https://elazdi-al.github.io/compsys/",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/compsys-cheatsheet/main/cheatsheet.pdf",
		gradientColors: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
		id: "course1",
	},
	{
		semester: "BA4",
		name: "Algorithm I: Cheatsheet",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/algorithms-cheatsheet/main/algorithms.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/algorithms-cheatsheet/main/algorithms.pdf",
		gradientColors: ["#4facfe", "#00f2fe", "#43e97b", "#38f9d7"],
		id: "course2",
	},

	// BA3 Semester
	{
		semester: "BA3",
		name: "Analysis III: Distribution Theory",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/DistributionTheory/main/main.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/DistributionTheory/main/main.pdf",
		gradientColors: ["#fa709a", "#fee140", "#ffecd2", "#fcb69f"],
		id: "course3",
	},
	{
		semester: "BA3",
		name: "Computer Architecture",
		description: "",
		link: "https://elazdi-al.github.io/comparch/",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/CheatSheetAnalyseIII/main/cheatsheet.pdf",
		gradientColors: ["#a8edea", "#fed6e3", "#d299c2", "#fef9d7"],
		id: "course4",
	},
	{
		semester: "BA3",
		name: "Analysis III: Cheatsheet",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/CheatSheetAnalyseIII/main/cheatsheet.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/CheatSheetAnalyseIII/main/cheatsheet.pdf",
		gradientColors: ["#ff9a9e", "#fecfef", "#fecfef", "#ffeaa7"],
		id: "course5",
	},

	// BA2 Semester
	{
		semester: "BA2",
		name: "Fundamentals of Digital Systems",
		description: "",
		link: "https://raw.githubusercontent.com/elazdi-al/FDS/main/modified_fds.pdf",
		pdfUrl: "https://raw.githubusercontent.com/elazdi-al/FDS/main/modified_fds.pdf",
		gradientColors: ["#e0c3fc", "#9bb5ff", "#a8edea", "#fed6e3"],
		id: "course6",
	},
];
