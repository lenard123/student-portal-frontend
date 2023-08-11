const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("pages/home/HomePage.vue"),
  },

  {
    path: "/login",
    name: "login",
    meta: { middlewares: ["guest"] },
    component: () => import("pages/login/LoginPage.vue"),
  },

  {
    path: "/admin",
    component: () => import("layouts/AdminLayout/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "admin:announcements",
        component: () =>
          import("pages/admin/announcements/AnnouncementsIndexPage.vue"),
      },
      {
        path: "messages",
        component: () => import("layouts/MessageLayout/MessageLayout.vue"),
        children: [
          {
            path: "",
            name: "admin:threads",
            component: () =>
              import("pages/admin/messages/MessagesIndexPage.vue"),
          },
          {
            path: ":thread_id",
            name: "admin:messages",
            component: () =>
              import("pages/admin/messages/[thread_id]/ThreadMessagesPage.vue"),
          },
        ],
      },
      {
        path: "faculties",
        name: "admin:faculties",
        component: () => import("pages/admin/faculties/FacultiesIndexPage.vue"),
      },
      {
        path: "faculties/:id",
        name: "admin:faculties/info",
        component: () =>
          import("pages/admin/faculties/[id]/FacultyInfoPage.vue"),
      },
      {
        path: "subjects",
        name: "admin:subjects",
        component: () => import("pages/admin/subjects/SubjectsIndexPage.vue"),
      },
      {
        path: "grade-levels",
        name: "admin:grade-levels",
        component: () => import("pages/admin/grade-levels/GradeLevelsPage.vue"),
      },
      {
        path: "grade-levels/:id",
        name: "admin:grade-levels/curriculum",
        component: () =>
          import("pages/admin/grade-levels/[id]/ManageCurriculumPage.vue"),
      },
      {
        path: "sections",
        name: "admin:sections",
        component: () => import("pages/admin/sections/SectionsPage.vue"),
      },
      {
        path: "sections/:id",
        name: "admin:sections/info",
        component: () =>
          import("pages/admin/sections/[id]/SectionInfoPage.vue"),
      },
      {
        path: "school-year",
        name: "admin:school-year",
        component: () => import("pages/admin/school-year/SchoolYearPage.vue"),
      },
      {
        path: "pre-enrollment",
        name: "admin:pre-enrollment",
        component: () =>
          import("pages/admin/pre-enrollment/PreEnrollmentPage.vue"),
      },
      {
        path: "pre-enrollment/:id",
        name: "admin:pre-enrollment/info",
        component: () =>
          import("pages/admin/pre-enrollment/[id]/RegistrationInfoPage.vue"),
      },
    ],
  },

  {
    path: "/student",
    component: () => import("layouts/StudentLayout/StudentLayout.vue"),
    children: [
      {
        path: "",
        name: "student:home",
        component: () => import("pages/student/home/HomePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
