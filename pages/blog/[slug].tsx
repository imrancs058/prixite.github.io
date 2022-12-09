import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import md from 'markdown-it';
import Image from 'next/image';
import { Box, Container, Stack, Typography } from '@mui/material';
import { joinUsLinkIcons, newsAndBlogs } from '../../data/data';

export default function PostPage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}: any) {
  return (
    <Container maxWidth="xl" className="page-header">
    <Box className="header">
      <Box className="heading">
        <Typography className="heading-text" sx={{ width: '95%' }}>
          {title}
        </Typography>
      </Box>
      <Stack direction={'row'} gap={3} alignItems="center">
        <Typography fontSize={12}>{date}</Typography>
        <Typography fontSize={12}>5 min read</Typography>
        <Stack
          direction={{ xs: 'column', md: 'column', lg: 'row' }}
          alignItems="center"
          gap={3}
          className="icons"
        >
          {joinUsLinkIcons.map(({ icon, path, width, height }, index) => (
            <Box key={index}>
              <a href={path} target="_blank" rel="noopener noreferrer">
                <Image
                  src={icon.src}
                  alt="icon"
                  width={width}
                  height={height}
                  objectFit="cover"
                />
              </a>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>

    <Container disableGutters>
    
   
        
        
     
         <div className='post-body'>
           <div dangerouslySetInnerHTML={{ __html: md().render(content) }}></div>
         </div>
   

    </Container>

    <Container className="likes">
      <Stack direction={'row'} gap={10}>
        <Stack direction={'row'} gap={1} alignItems="center">
          <Image
            src={newsAndBlogs.likesImg.src}
            width={25}
            height={25}
            alt="icon"
          />
          <Typography fontSize={13}>10 Likes</Typography>
        </Stack>
        <Stack direction={'row'} gap={1} alignItems="center">
          <Image
            src={newsAndBlogs.commentsImg.src}
            width={25}
            height={25}
            alt="icon"
          />
          <Typography fontSize={13}>10 Comments </Typography>
        </Stack>
      </Stack>
      <Stack
        direction={'row'}
        gap={1}
        alignItems="center"
        className="scroll-top"
        style={{cursor: 'pointer'}}  onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
      >
        <Image
          src={newsAndBlogs.scrollToTopImg.src}
          width={25}
          height={25}
          alt="icon"
        />
        <Typography fontSize={13}>Back To Top </Typography>
      </Stack>
    </Container>
  </Container>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}