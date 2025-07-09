import { v } from 'convex/values';
import { query, mutation } from './_generated/server';

export const findFirst = query({
  handler: async (ctx) => {
    return await ctx.db.query('plans').order('desc').first();
  },
});

export const addPlan = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('plans', {
      content: args.content,
      createdAt: Date.now(),
    });
  },
});

// 批量上传接口
export const batchUpload = mutation({
  args: {
    contents: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    for (const content of args.contents) {
      await ctx.db.insert('plans', {
        content,
        createdAt: Date.now(),
      });
    }
  },
});
