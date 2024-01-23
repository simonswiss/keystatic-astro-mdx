import { collection, config, fields } from "@keystatic/core"
import { block, mark, repeating } from "@keystatic/core/content-components"
import { __experimental_mdx_field } from "@keystatic/core/form/fields/markdoc"

const Highlight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-highlighter"
  >
    <path d="m9 11-6 6v3h9l3-3" />
    <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
  </svg>
)

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    recipes: collection({
      path: "src/content/recipes/*",
      label: "Recipes",
      slugField: "title",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        duration: fields.integer({
          label: "Duration",
          description: "Time (in minutes) to cook this recipe",
        }),
        content: __experimental_mdx_field({
          label: "Content",
          description: "Teach your magic...",
          components: {
            List: repeating({
              label: "List",
              children: "IngredientsTable",
              schema: {
                title: fields.text({ label: "Title" }),
              },
            }),
            IngredientsTable: block({
              label: "Ingredients Table",
              schema: {
                items: fields.array(
                  fields.object({
                    name: fields.text({ label: "Name" }),
                    quantity: fields.text({ label: "Amount" }),
                  }),
                  {
                    label: "Ingredients",
                    itemLabel: (props) => props.fields.name.value,
                  },
                ),
              },
            }),
            Highlight: mark({
              label: "Highlight",
              icon: <Highlight />,
              className: "highlight",
              style: (props) => {
                if (props.value.variant === "success")
                  return {
                    backgroundColor: "#d4edda",
                    color: "#155724",
                    borderColor: "#c3e6cb",
                  }
                return {
                  backgroundColor: "#fff3cd",
                  color: "#856404",
                  borderColor: "#ffeeba",
                }
              },
              schema: {
                variant: fields.select({
                  label: "Variant",
                  options: [
                    { value: "default", label: "Default" },
                    { value: "success", label: "Success" },
                    { value: "warning", label: "Warning" },
                    { value: "danger", label: "Danger" },
                  ],
                  defaultValue: "default",
                }),
              },
            }),
          },
        }),
      },
    }),
  },
})
