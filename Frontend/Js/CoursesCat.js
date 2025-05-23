const categories = [
  {
    title: "Science | Research",
    img: "https://images.unsplash.com/photo-1595311182166-d63273ddc386?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Explore the latest advancements in science and research across various fields, from groundbreaking discoveries to emerging theories that shape the future.",
  },
  {
    title: "Web Development",
    img: "https://plus.unsplash.com/premium_vector-1682309081920-d2725d3e620c?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Dive into the world of web development, where coding, design, and creativity come together to build interactive, user-friendly websites and applications.",
  },
  {
    title: "Cybersecurity",
    img: "https://plus.unsplash.com/premium_photo-1674669009418-2643aa58b11b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Understand the importance of protecting systems, networks, and data from digital threats. Learn the best practices in securing online platforms and mitigating cyber risks.",
  },
  {
    title: "Artificial Intelligence",
    img: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Discover the powerful realm of artificial intelligence, where machines mimic human intelligence to solve complex problems and improve automation in various industries.",
  },
  {
    title: "Media, Arts | Entertainment",
    img: "https://images.unsplash.com/photo-1490971688337-f2c79913ea7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Immerse yourself in the world of creative expression, from visual arts to music, film, and entertainment, exploring the latest trends and influential works.",
  },
  {
    title: "Freelance | Entrepreneurship",
    img: "https://images.unsplash.com/photo-1654154117128-273db99e6faf?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Learn how to kickstart your freelance career or build a business from the ground up. This category focuses on the skills, strategies, and mindset needed for entrepreneurial success.",
  },
  {
    title: "Technical Tools and Platforms",
    img: "https://images.unsplash.com/photo-1665392996886-0949d131a5da?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Explore a wide range of technical tools and platforms that help developers, engineers, and designers streamline their workflows and create powerful solutions.",
  },

  {
    title: "Ethical Hacking",
    img: "https://plus.unsplash.com/premium_photo-1714618835760-5b2175ad3249?q=80&w=1789&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Learn the art of ethical hacking to uncover vulnerabilities in systems before malicious hackers can exploit them. This category covers penetration testing, cybersecurity, and defense strategies.",
  },

  {
    title: "Robotics",
    img: "https://plus.unsplash.com/premium_photo-1680402879257-48ffbbc6db1d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Dive into the exciting field of robotics, where innovation is shaping industries with automated machines, autonomous vehicles, and intelligent robots that perform tasks with precision.",
  },

  {
    title: "Machine Learning",
    img: "https://plus.unsplash.com/premium_vector-1726335456102-3c56334cda90?q=80&w=1818&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Learn how machines can learn from data, identify patterns, and make predictions. This category covers algorithms, neural networks, and applications in various industries.",
  },
  {
    title: "Programming",
    img: "https://plus.unsplash.com/premium_vector-1682310664746-f934119dffd6?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Master the basics and advanced concepts of programming in languages like Python, C, Java, and more. Develop the problem-solving skills needed to write efficient, clean code.",
  },
];

const container = document.getElementById("courses-category");
categories.forEach((category) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
      <h2>${category.title}</h2>
      <div class="image">
      <img src="${category.img}" alt="${category.title}" />
      </div>
      <p class="m-1">${category.description}</p>
      <a href="../Html/coursevideo.html?category=${encodeURIComponent(
        category.title
      )}" class="showmorebtn course">Explore</a>
  `;
  container.appendChild(card);
});