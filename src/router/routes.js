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
    meta: { middlewares: ["auth", "admin"] },
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
        path: "school-year",
        name: "admin:school-year",
        component: () => import("pages/admin/school-year/SchoolYearPage.vue"),
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
