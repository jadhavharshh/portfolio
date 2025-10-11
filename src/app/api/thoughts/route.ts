import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// GET all posts
export async function GET() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Get all posts ordered by date
    const posts = await sql`
      SELECT id, title, slug, excerpt, created_at as date
      FROM posts
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('Get posts error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST new post
export async function POST(request: NextRequest) {
  try {
    const { title, slug, excerpt, content } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO posts (title, slug, excerpt, content)
      VALUES (${title}, ${slug}, ${excerpt || ''}, ${content})
    `;

    return NextResponse.json({ success: true, message: 'Post created successfully!' });
  } catch (error: any) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
