import { graphql, HeadFC } from "gatsby";
import type { PageProps } from "gatsby";
import { css } from "@emotion/react";

import { BaseHead } from "../../components/BaseHead";
import BasePage from "../../components/BasePage";

type DataProps = {
  markdownRemark: {
    frontmatter: { title: string };
    html: string;
  };
};

const BlogPostTemplate: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <BasePage currentPath={path}>
      <div
        className="fr-container fr-my-5w"
        css={css`
          min-height: calc(100vh - 410px);
        `}
      >
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </BasePage>
  );
};

export default BlogPostTemplate;

export const Head: HeadFC = BaseHead;

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`;
