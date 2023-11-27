import { css } from "@emotion/react";
import { HeadFC, graphql } from "gatsby";
import type { PageProps } from "gatsby";

import { BaseHead } from "../../components/BaseHead";

type DataProps = {
  markdownRemark: {
    frontmatter: { title: string };
    html: string;
  };
};

const BlogPostTemplate: React.FC<PageProps<DataProps>> = ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div
      className="fr-container fr-my-5w"
      css={css`
        min-height: calc(100vh - 410px);
      `}
    >
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default BlogPostTemplate;

export const Head: HeadFC = BaseHead;

export const pageQuery = graphql`
  query StaticPageFromMD($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`;
