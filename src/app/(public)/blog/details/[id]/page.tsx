import BlogDetailsComponent from "@/components/publiLayoutComponent/blog/BlogDetails";

const BlogDetails = ({ params }: any) => {
  console.log(params);
  
  return <BlogDetailsComponent params={params} />;
};

export default BlogDetails;
