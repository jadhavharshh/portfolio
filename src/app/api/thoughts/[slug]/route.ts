import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET single post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const posts = await sql`
      SELECT id, title, slug, excerpt, content, created_at as date, updated_at
      FROM posts
      WHERE slug = ${slug}
      LIMIT 1
    `;

    if (posts.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: posts[0] });
  } catch (error: any) {
    console.error('Get post error:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT update post by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { title, newSlug, excerpt, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      UPDATE posts
      SET title = ${title},
          slug = ${newSlug || slug},
          excerpt = ${excerpt || ''},
          content = ${content},
          updated_at = NOW()
      WHERE slug = ${slug}
    `;

    return NextResponse.json({ success: true, message: 'Post updated successfully!' });
  } catch (error: any) {
    console.error('Update post error:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
