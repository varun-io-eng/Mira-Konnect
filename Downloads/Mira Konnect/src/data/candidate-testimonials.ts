export type CandidateTestimonial = {
  id: string;
  headline: string;
  body: string;
  name: string;
  role: string;
  company?: string;
  initials: string;
};

export const candidateTestimonials: CandidateTestimonial[] = [
  {
    id: "sarang-vyawahare",
    headline: "Great throughout the whole recruitment process.",
    body:
      "Mira Konnect has been great throughout the whole recruitment process! Mira Konnect is a very professional and dedicated recruitment team. I would like to appreciate the whole team for offering me such a great opportunity. The entire process was seamless, from the initial screening to the final offer. Their understanding of the industry and ability to match me with the right role was impressive. I felt supported at every step and they were always available to answer my questions. I highly recommend their services to anyone looking for their next career move.",
    name: "Sarang Vyawahare",
    role: "Asst. Manager QA",
    company: "Pharmaceutical Company",
    initials: "SV",
  },
  {
    id: "dharmik-darji",
    headline: "Professional, dedicated—and fast.",
    body:
      "Mira Konnect has been absolutely amazing throughout the whole recruitment process! I have never met such a professional and dedicated recruitment team. I cannot thank you enough for your full support, for believing in me, and for helping me start a new chapter of my professional career within just a couple of weeks! You are brilliant at what you do. Their attention to detail and commitment to finding the perfect match is unmatched. The team went above and beyond to ensure I was well-prepared for every interview. Thanks & warm regards.",
    name: "Dharmik Darji",
    role: "Officer, Regulatory Affairs",
    company: "Healthcare Solutions",
    initials: "DD",
  },
  {
    id: "chirag-kalsariya",
    headline: "Support that opened a Manager-level opportunity.",
    body:
      "I would like to express my sincere gratitude to Mira Konnect for supporting me in securing a Manager-level position and taking the next step in my professional career. Your guidance and continuous support have helped me achieve this important milestone and gain new responsibilities and valuable professional experience. I truly appreciate your efforts, commitment, and assistance throughout the recruitment process. The team's expertise in the field and personalized approach made all the difference. I highly recommend Mira Konnect services to professionals looking for the right career opportunities.",
    name: "Chirag Kalsariya",
    role: "Cinematographer / Video Editor",
    company: "Media Productions",
    initials: "CK",
  },
  {
    id: "ganesh-polasa",
    headline: "Smooth, friendly, and hassle-free.",
    body:
      "The team at Mira Konnect has been amazing throughout the recruitment process! I truly appreciate their professionalism, friendly approach, and continuous support in making the entire process smooth and hassle-free. I'm grateful to Mira Konnect for helping me get selected at Hari Krishna Exports Pvt. Ltd., Surat and supporting me in taking the next step in my professional career. Thank you for your dedication and guidance throughout this journey! Their ability to understand my skills and match them with the right opportunity was exceptional. I couldn't have asked for a better experience.",
    name: "Ganesh Polasa",
    role: "Full Stack Developer",
    company: "Hari Krishna Exports Pvt. Ltd., Surat",
    initials: "GP",
  },
  {
    id: "ritesh-kevat",
    headline: "Trusted partners in quality hiring.",
    body:
      "Mira Konnect supported me with a clear, professional recruitment process from first contact through selection. I appreciate the team's dedication, timely communication, and belief in my experience. Thank you for helping me advance in my career. Their transparent approach and regular updates kept me informed at every stage. The team's expertise in quality assurance recruitment was evident throughout. They took the time to understand my career goals and found a role that perfectly aligned with my aspirations. I am truly grateful for their exceptional service.",
    name: "Ritesh Kevat",
    role: "Manager, Quality Assurance",
    company: "Suyaash Pharmaceutical",
    initials: "RK",
  },
];

export function getCandidateTestimonial(id: string) {
  return candidateTestimonials.find((t) => t.id === id);
}
