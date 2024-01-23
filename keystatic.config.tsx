import { collection, config, fields } from "@keystatic/core"
import { block } from "@keystatic/core/content-components"
import { __experimental_mdx_field } from "@keystatic/core/form/fields/markdoc"

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
            IngredientsTable: block({
              label: "Ingredients Table",
              schema: {
                items: fields.array(
                  fields.object({
                    name: fields.text({ label: "Name" }),
                    quantity: fields.text({ label: "Amount" }),
                  }),
                ),
              },
              ContentView: (props) => (
                <dl>
                  <pre>{JSON.stringify(props, null, 2)}</pre>
                </dl>
              ),
            }),
          },
        }),
      },
    }),
  },
})
