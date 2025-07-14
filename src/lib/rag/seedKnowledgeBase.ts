import { addKnowledgeToRAG } from './RAGEnhancedAI';

export const initialKnowledgeBase = [
  {
    content: `
Social Media Bio Best Practices:

1. Know Your Audience: Always consider who you're trying to reach on each platform. Your bio should speak directly to your target audience's interests and needs.

2. Platform-Specific Optimization:
   - Twitter/X: Focus on personality and what you tweet about. Use clear, concise language that fits the fast-paced nature of the platform.
   - Instagram: Emphasize visual content and lifestyle. Use line breaks and emojis to make your bio scannable.
   - LinkedIn: Highlight professional achievements and expertise. Use industry keywords for discoverability.

3. Value Proposition: Clearly communicate what followers will gain by following you. What unique content, insights, or entertainment do you provide?

4. Consistency Across Platforms: While adapting to each platform's style, maintain a consistent personal or brand voice across all social media.

5. Call-to-Action: Include a subtle call-to-action that encourages engagement or directs followers to your content.

6. Keywords for Discoverability: Use relevant keywords that your target audience might search for, but integrate them naturally.

7. Authenticity: Be genuine and let your personality shine through. Authentic bios perform better than overly polished ones.

8. Regular Updates: Keep your bio current with your latest projects, achievements, or focus areas.
`,
    metadata: {
      source: 'Social Media Bio Guide v1.0',
      type: 'guideline' as const,
      title: 'Social Media Bio Best Practices',
      tags: ['social media', 'bio writing', 'best practices', 'optimization'],
    }
  },
  {
    content: `
Twitter/X Bio Writing Guidelines:

Character Limits: Keep bios between 120-160 characters for optimal readability.

Effective Formats:
- "I do [what you do] for [target audience] | [unique value proposition]"
- "[Role/profession] who [unique angle or approach]"
- "[Personal descriptor] + [professional role] + [what you share]"

Content Elements:
- Lead with your most important identifier (role, expertise, or unique trait)
- Include what you tweet about to set expectations
- Use parallel structure for multiple roles (e.g., "Writer. Speaker. Consultant.")
- Add personality with subtle humor or personal touches
- Avoid jargon and buzzwords that don't add value

Common Mistakes to Avoid:
- Using all caps or excessive punctuation
- Listing too many roles without focus
- Being too generic or vague
- Overusing hashtags (avoid them entirely in bios)
- Making it all about yourself without considering the reader

Engagement Boosters:
- Ask a subtle question or use conversational language
- Include a hint about your posting schedule or content themes
- Use emojis sparingly and purposefully
- Create intrigue without being mysterious
`,
    metadata: {
      source: 'Twitter Bio Optimization Guide',
      type: 'guideline' as const,
      title: 'Twitter/X Bio Writing Guidelines',
      tags: ['twitter', 'bio', 'character limits', 'engagement'],
    }
  },
  {
    content: `
Instagram Bio Optimization:

Visual Appeal: Instagram is a visual platform, so your bio should be visually appealing and easy to scan.

Effective Structures:
- Use line breaks to separate different elements
- Employ emojis as bullet points or dividers
- Create a hierarchy with your most important information first
- Use spacing strategically for readability

Content Strategies:
- Lead with your main identifier or what you're known for
- Include your location if relevant to your audience
- Mention what type of content you post
- Add personality through voice and tone
- Include a call-to-action or link direction

Emoji Usage:
- Use relevant emojis that enhance your message
- Don't overuse emojis – they should support, not replace, your words
- Choose emojis that align with your brand or personality
- Use emojis as visual separators between different bio elements

Professional vs. Personal:
- Business accounts should focus on value proposition and services
- Personal accounts can be more casual and lifestyle-focused
- Influencer accounts should highlight niche and posting themes
- Mix professional accomplishments with personal touches for relatability

Link Strategy:
- Use your bio link strategically (latest content, landing page, or link tree)
- Reference your link in your bio copy
- Update your link regularly to keep it relevant
`,
    metadata: {
      source: 'Instagram Bio Mastery Guide',
      type: 'guideline' as const,
      title: 'Instagram Bio Optimization',
      tags: ['instagram', 'bio', 'visual appeal', 'emojis', 'engagement'],
    }
  },
  {
    content: `
LinkedIn Bio Excellence:

Professional Focus: LinkedIn bios should always maintain a professional tone and focus on career-related achievements and expertise.

Key Elements:
- Start with your current role and company
- Include years of experience in your field
- Highlight key skills and areas of expertise
- Mention notable achievements or recognition
- Include relevant industry keywords for searchability

Effective Formats:
- "Experienced [role] with [X years] of expertise in [field/industry]"
- "[Role] | [Key achievement] | [Area of expertise]"
- "[Professional descriptor] helping [target audience] achieve [specific outcome]"

Content Strategy:
- Lead with your most impressive credential or current role
- Include specific numbers or achievements when possible
- Mention your industry or niche clearly
- Reference your approach or methodology if relevant
- End with a subtle call-to-action for connections

Keyword Optimization:
- Use industry-specific terms that recruiters search for
- Include relevant skills and technologies
- Mention your location if local connections are important
- Use synonyms for key terms to increase discoverability

Professional Tone Tips:
- Write in first person for a personal touch
- Use active voice and strong action verbs
- Be confident but not boastful
- Focus on value you bring to others
- Keep it concise and scannable
`,
    metadata: {
      source: 'LinkedIn Professional Bio Guide',
      type: 'guideline' as const,
      title: 'LinkedIn Bio Excellence',
      tags: ['linkedin', 'professional', 'bio', 'career', 'networking'],
    }
  },
  {
    content: `
Bio Writing Psychology and Engagement:

First Impressions: Your bio is often the first thing people see, so it needs to make a strong first impression within seconds.

Psychological Triggers:
- Social proof (mentioning followers, clients, or achievements)
- Authority (credentials, experience, or expertise)
- Likability (personality, humor, or relatability)
- Scarcity (unique skills or limited availability)
- Reciprocity (offering value or help)

Engagement Techniques:
- Use second person ("you") to address the reader directly
- Ask implied questions that make people want to learn more
- Create a sense of community or belonging
- Use power words that evoke emotion
- Include elements that encourage interaction

Personality Integration:
- Share what makes you unique or different
- Include interests or hobbies that humanize you
- Use humor appropriately for your audience
- Show vulnerability or authenticity
- Balance professionalism with personality

Common Emotional Triggers:
- Curiosity: "I help people discover..."
- Aspiration: "Helping you achieve..."
- Problem-solving: "Solving [specific problem] for..."
- Inspiration: "Inspiring others to..."
- Transformation: "Transforming [area] through..."

Readability Factors:
- Use simple, clear language
- Avoid jargon unless your audience expects it
- Keep sentences short and punchy
- Use parallel structure for multiple elements
- Create rhythm through word choice and pacing
`,
    metadata: {
      source: 'Bio Psychology and Engagement Study',
      type: 'reference' as const,
      title: 'Bio Writing Psychology and Engagement',
      tags: ['psychology', 'engagement', 'first impressions', 'personality'],
    }
  },
  {
    content: `
Tone and Voice Guidelines for Different Bio Types:

Professional Tone:
- Use formal language and industry terminology
- Focus on achievements, credentials, and expertise
- Employ third person or formal first person
- Include specific metrics and accomplishments
- Maintain objectivity and credibility

Casual Tone:
- Use conversational language and everyday words
- Include personal interests and casual observations
- Write in first person with contractions
- Add humor and personality
- Be approachable and relatable

Funny/Humorous Tone:
- Use wit and clever wordplay appropriately
- Include self-deprecating humor when suitable
- Make observations that resonate with your audience
- Balance humor with valuable information
- Ensure humor aligns with your brand or personality

Passionate Tone:
- Use emotional language and strong descriptors
- Include words that convey enthusiasm and energy
- Share your mission or purpose
- Use exclamation points sparingly but effectively
- Show what drives and motivates you

Thoughtful Tone:
- Use reflective language and deeper insights
- Include philosophical or introspective elements
- Share wisdom or lessons learned
- Use metaphors or analogies effectively
- Demonstrate depth and consideration

Sarcastic Tone:
- Use irony and subtle criticism appropriately
- Include unexpected twists or observations
- Balance sarcasm with genuine value
- Ensure sarcasm doesn't alienate your audience
- Use this tone sparingly and strategically

Tone Adaptation by Platform:
- LinkedIn: Always lean professional regardless of chosen tone
- Twitter: Can accommodate most tones effectively
- Instagram: Works well with casual, funny, and passionate tones
`,
    metadata: {
      source: 'Tone and Voice Style Guide',
      type: 'guideline' as const,
      title: 'Tone and Voice Guidelines for Different Bio Types',
      tags: ['tone', 'voice', 'style', 'communication', 'personality'],
    }
  },
  {
    content: `
High-Converting Bio Examples and Templates:

Personal Brand Templates:
- "I help [target audience] [achieve specific outcome] through [your method/approach]"
- "[Your role/profession] | [Notable achievement] | [What you share/teach]"
- "[Unique descriptor] who [what you do] for [target audience]"
- "[Personal trait] + [professional role] sharing [content type] about [topic]"

Business/Brand Templates:
- "We help [target audience] [achieve outcome] with [service/product]"
- "[Company mission] | [Key differentiator] | [Call-to-action]"
- "[Industry] experts providing [specific value] to [target market]"
- "Transforming [industry/area] through [your approach/solution]"

Influencer/Creator Templates:
- "[Niche] content creator sharing [content type] about [topics]"
- "Helping [audience] [achieve goal] through [content format]"
- "[Expertise area] | [Platform focus] | [Unique angle]"
- "Your go-to source for [topic] | [Content schedule] | [Community description]"

Multi-Role Templates:
- "[Role 1] by day, [Role 2] by night | [What connects them]"
- "[Role 1] + [Role 2] + [Role 3] | [Common thread]"
- "Wearing many hats: [Role 1], [Role 2], [Role 3] | [What ties them together]"

Conversion Optimization:
- Start with the most compelling or recognizable element
- Include social proof when available
- Add a clear value proposition
- Use active voice and strong verbs
- End with a subtle call-to-action
- Test different versions to see what resonates
`,
    metadata: {
      source: 'High-Converting Bio Templates Collection',
      type: 'example' as const,
      title: 'High-Converting Bio Examples and Templates',
      tags: ['templates', 'examples', 'conversion', 'personal brand', 'business'],
    }
  },
  {
    content: `
Platform-Specific Character Limits and Best Practices:

Twitter/X:
- Bio limit: 160 characters
- Optimal length: 120-160 characters
- Name limit: 50 characters
- Location limit: 30 characters
- Website: 1 URL allowed
- Best practices: Use every character wisely, avoid hashtags in bio, include personality

Instagram:
- Bio limit: 150 characters
- Optimal length: 100-150 characters
- Name limit: 30 characters
- Website: 1 URL allowed (use link trees for more)
- Best practices: Use line breaks, emojis as bullet points, include call-to-action

LinkedIn:
- Headline limit: 220 characters
- Optimal length: 160-220 characters
- Name: First name + Last name
- Location: City, State/Country
- Industry: Selected from dropdown
- Best practices: Use keywords, include current role, highlight achievements

TikTok:
- Bio limit: 80 characters
- Optimal length: 60-80 characters
- Name limit: 30 characters
- Best practices: Be concise, use trending terms, include what you create

YouTube:
- Channel description: 1,000 characters
- Optimal length: 200-300 characters for above-fold
- Best practices: Front-load important information, include upload schedule

Facebook:
- Page description: 255 characters
- Personal bio: 101 characters
- Best practices: Include contact information, business hours, call-to-action

Character Count Strategies:
- Write long, then edit down
- Use abbreviations sparingly
- Remove unnecessary words
- Use symbols instead of words where appropriate
- Prioritize most important information
`,
    metadata: {
      source: 'Platform Character Limits Reference',
      type: 'reference' as const,
      title: 'Platform-Specific Character Limits and Best Practices',
      tags: ['character limits', 'platforms', 'optimization', 'constraints'],
    }
  }
];

export async function seedKnowledgeBase() {
  try {
    const result = await addKnowledgeToRAG(initialKnowledgeBase);
    console.log('Knowledge base seeded successfully:', result);
    return result;
  } catch (error) {
    console.error('Error seeding knowledge base:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
