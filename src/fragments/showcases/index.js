import { graphql } from 'gatsby'

export const ShowcasesFragment = graphql`
    fragment ShowcasesFragment on Query {
        showcases: allPortfolioJson(sort: { order: ASC, fields: image }) {
            edges {
                node {
                    id,
                    title,
                    subtitle,
                    type,
                    image {
                        publicURL
                    },
                    coAuthors,
                    tags,
                    description,
                    link,
                    sourceCodeLink
                }
            }
        }
    }
`