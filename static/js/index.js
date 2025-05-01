const { createApp, defineComponent, ref, watch, onMounted, computed } = Vue;

const vAbout = defineComponent({
  template: `
    <div className="content-section" id="about">
      <div class="about-img">
        <img src="./static/img/icon.jpg" alt="My Icon" id="my-info-icon"/>
      </div>
      <div class="self-introduction">
        <h1>Yang Yupeng</h1>
        <h2>I'm </h2>
        <h2 class="gradient-text">{{ typedText1 }}</h2>

        <h3 v-if="showSpecializing">specializing in</h3>
        <h2 v-if="showSpecializing" class="gradient-text">{{ typedText2 }}</h2>

        <div class="btn-container">
          <el-button
            size="large"
            type="success"
            @click="openMyPage"
            round
          >
            <p>Buy me A Coffee</p>
          </el-button>
        </div>
      </div>
    </div>
  `,
  setup() {
    const openMyPage = () => {
      window.open("https://www.paypal.com/paypalme/Yupeng2905", "_blank");
    };

    const text1 = "AI Programmer & Full-Stack Developer & Computational Architectural Designer";
    const text2 = "Deep Learning & Generative AI & Architectural Computing";
    const typedText1 = ref("");
    const typedText2 = ref("");
    const showSpecializing = ref(false); // 控制 `<h3>` 是否显示

    const typeText = (text, targetRef, speed = 100, callback = null) => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          targetRef.value += text[index];
          index++;
        } else {
          clearInterval(interval);
          if (callback) callback();
        }
      }, speed);
    };

    onMounted(() => {
      typeText(text1, typedText1, 20, () => {
        setTimeout(() => {
          showSpecializing.value = true; // 第二行打字前,, 才让 `<h3>` 出现
          typeText(text2, typedText2, 20);
        }, 100);
      });
    });

    return {
      openMyPage,
      typedText1,
      typedText2,
      showSpecializing, // 控制 `<h3>` 何时显示
    };
  }
});



const vSkill = defineComponent({
  template: `
    <div class="content-section" id="skill">
      <div class="skills-container">
        <h2 class="gradient-text">My Skills</h2>
        <el-divider />

        <div class="mainsub-skills-map">
          <div v-for="(skillCategory, key, index) in mySkills" :key=index class="skill-category-container">
            <div class="main-skill-map">
              <img :src="'./static/img/' + skillCategory.img" alt="Skill Category"  class="main-skill-category-icon"/>
              <h4>{{ formatCategoryName(key) }}</h4>
            </div>
            <el-divider />

            <div v-for="(subSkillInfo, key, index) in skillCategory.skills" :key=index class="sub-skill-map">
              <img :src="'./static/img/' + subSkillInfo[0]" alt="Skill Category"  class="sub-skill-category-icon"/>
              <h5>{{ key.replace('sharp', '#') }}</h5>
              <h6><i>{{ subSkillInfo[1] }}</i></h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  setup() {
    const mySkills = ref({
      ProgrammingLanguages: {
        img: "programming.png",
        skills: {
          Python: ["python.png", "Main Language"],
          Javascript: ["javascript.jpg", "Main Language"],
          Typescript: ["typescript.jpg", "Secondary Language"],
          Csharp: ["csharp.png", "Secondary Language"]
        }
      },
      FrontEnd: {
        img: "frontend.png",
        skills: {
          HTML: ["html.png", "Markup Language"],
          CSS: ["css.png", "Stylesheet Language"],
          VUE: ["vue.png", "JS UI Framework"],
          ThreeJs: ["threejs.png", "Web-based 3D Rendering"],
          ElementPlus: ["element-plus.png", "Vue UI Component"]
        }
      },
      BackEnd: {
        img: "backend.png",
        skills: {
          FastAPI: ["fast-api.png", "Python Web Framework"],
          Flask: ["flask.png", "Python Web Framework"]
        }
      },
      DeepLearning: {
        img: "ai.png",
        skills: {
          Pytorch: ["pytorch.png", "Deep Learning Framework"],
          Tensorflow: ["tensorflow.png", "Deep Learning Framework"],
          HuggingFace: ["huggingface.png", "Pre-trained AI model library"]
        }
      },
      ArchitecturalComputingDataAndVisualization: {
        img: "architectural-analysis.png",
        skills: {
          IfcOpenShell: ["ifc-open-shell.png", "Pyhon BIM Data Processing Library"],
          VTK: ["vtk.png", "Pyhon 3D Rendering & Visualization"],
          Rhino3dmJS: ["rhino.png", "Web-based Rhino 3D Library"],
          IfcJS: ["ifc-js.png", "Web-based IFC 3D Visualization"],
          Ladybug: ["ladybug.png", "Python Building Environment Analysis Library"],
          Honeybee: ["honeybee.png", "Python Building Energy Analysis Library"]
        }
      },
      GeometricComputation: {
        img: "geometry-analysis.png",
        skills: {
          Shapely: ["shapely.png", "Pyhon Geometric Computation Library"]
        }
      },
      OtherComputingDataAndVisualization: {
        img: "data-analysis.png",
        skills: {
          Numpy: ["numpy.png", "Numerical Computation"],
          Pandas: ["pandas.png", "Data Processing & Analysis"],
          Matplotlib: ["matplotlib.png", "Data Visualization"]
        }
      }
    });
    const formatCategoryName = (name) => {
      return name
        .replace(/([A-Z])/g, "-$1") // 在大写字母前加 `-`
        .replace(/^-/, "") // 去掉开头的 `-`
        .replace(/^./, (str) => str.toUpperCase()) // 仅首字母大写
        .replace(/-And-/gi, " & "); // 把 "-And-" 替换成 " & "
    };


    return {
      mySkills,
      formatCategoryName,
    }
  }
});

const vProject = defineComponent({
  template: `

  `,
});

const vContent = defineComponent({
  template: `
  <div class="content-section" id="research">
    <h1>This developer is too lazy to write anything</h1>
  </div>
  `,
  components: {
    "v-project": vProject
  },
  setup() {


    return {
    }
  }
});



const app = createApp({
  components: {
    "v-about": vAbout,
    "v-skill": vSkill,
    "v-content": vContent,
  },
  setup() {
    const myInfos = ref([
      { name: "About Me", section: "about" },
      { name: "My Skills", section: "skill" },
      { name: "Projects & Research", section: "research" },
    ]);

    const isDarkModel = ref(true);
    const githubIconSrc = ref("./static/img/github-mark-white.png");
    const activeColor = ref("#fff");
    watch(isDarkModel, () => {
      if (isDarkModel.value) {
        document.documentElement.classList.add("dark");
        githubIconSrc.value = "./static/img/github-mark-white.png";
        activeColor.value = "#fff";
      } else {
        document.documentElement.classList.remove("dark");
        githubIconSrc.value = "./static/img/github-mark.png";
        activeColor.value = "#000";
      }
    })

    const currentSection = ref("about");
    const handleClick = (section) => {
      currentSection.value = section; // 更新高亮的导航项
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // 平滑滚动到该内容块
      }

      setTimeout(() => {
        if (section === "future") {
          const petals = element.querySelectorAll(".petal");
          petals.forEach((petal) => petal.classList.remove("active"));
        }

        element.classList.remove("active"); // 先移除
        setTimeout(() => {
          element.classList.add("active"); // 再添加
          if (section === "future") {
            const petals = element.querySelectorAll(".petal");
            petals.forEach((petal) => petal.classList.add("active"));
          }
        }, 50); // 50ms 之后重新添加，确保动画重新执行
      }, 10); // `scrollIntoView` 需要一定时间，等滚动结束再执行

    };


    const updateRouterHeight = () => {
      const router = document.querySelector(".router-container");

      if (router) {
        document.documentElement.style.setProperty("--router-height", `${router.offsetHeight}px`);
      }
    };



    onMounted(() => {
      updateRouterHeight();
      window.addEventListener("resize", updateRouterHeight);
    });

    return {
      myInfos,
      currentSection,
      isDarkModel,
      githubIconSrc,
      activeColor,
      handleClick,
    }
  },
});

app.use(ElementPlus);
app.mount("#app");
