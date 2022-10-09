import { builder } from "../../builder";

builder.objectType("LaunchLinksFlickr", {
  fields: (t) => ({
    original: t.exposeStringList("original"),
  }),
});

builder.objectType("LaunchLinksPatch", {
  fields: (t) => ({
    small: t.exposeString("small", {nullable: true}),
    large: t.exposeString("large", {nullable: true}),
  }),
});

builder.objectType("LaunchLinks", {
  fields: (t) => ({
    flickr: t.expose("flickr", { type: "LaunchLinksFlickr" }),
    patch: t.expose("patch", { type: "LaunchLinksPatch" }),
  }),
});
