/**
 * Sanity Schema: Schedule Day
 * 
 * Add this schema to your Sanity Studio to manage the radio schedule.
 * 
 * SETUP INSTRUCTIONS:
 * 1. In your Sanity Studio project, create this file at: schemas/scheduleDay.ts
 * 2. Import it in your schemas/index.ts:
 *    import scheduleDay from './scheduleDay'
 *    export const schemaTypes = [scheduleDay, ...otherSchemas]
 * 3. Deploy your Sanity Studio: npx sanity deploy
 * 4. Go to your Sanity Studio and create 7 "Schedule Day" documents (one per day)
 */

export default {
  name: 'scheduleDay',
  title: 'Schedule Day',
  type: 'document',
  fields: [
    {
      name: 'dayId',
      title: 'Day ID',
      type: 'string',
      description: 'Lowercase day name (e.g., "monday", "tuesday")',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ]
      }
    },
    {
      name: 'dayName',
      title: 'Day Name',
      type: 'string',
      description: 'Display name (e.g., "Monday")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dayOrder',
      title: 'Day Order',
      type: 'number',
      description: 'Order of the day (0 = Monday, 6 = Sunday)',
      validation: (Rule: any) => Rule.required().min(0).max(6),
    },
    {
      name: 'broadcasts',
      title: 'Broadcasts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'broadcast',
          title: 'Broadcast',
          fields: [
            {
              name: 'time',
              title: 'Time Slot',
              type: 'string',
              description: 'Format: "HH:MM - HH:MM" (24h, e.g., "18:00 - 21:00")',
              validation: (Rule: any) => Rule.required().regex(/^\d{2}:\d{2}\s-\s\d{2}:\d{2}$/),
            },
            {
              name: 'title',
              title: 'Show Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'isLive',
              title: 'Is Live Show?',
              type: 'boolean',
              description: 'Toggle on for live DJ shows',
              initialValue: false,
            },
            {
              name: 'producer',
              title: 'Producer/DJ',
              type: 'string',
              description: 'Name of the DJ (only for live shows). Add "(bi-weekly)" if applicable.',
              hidden: ({ parent }: { parent: { isLive?: boolean } }) => !parent?.isLive,
            },
            {
              name: 'mixcloudUrl',
              title: 'Mixcloud URL',
              type: 'url',
              description: 'Link to producer\'s Mixcloud profile',
              hidden: ({ parent }: { parent: { isLive?: boolean } }) => !parent?.isLive,
            },
            {
              name: 'tags',
              title: 'Genre Tags',
              type: 'string',
              description: 'Comma-separated genres (only for playlists)',
              hidden: ({ parent }: { parent: { isLive?: boolean } }) => parent?.isLive,
            },
          ],
          preview: {
            select: {
              title: 'title',
              time: 'time',
              producer: 'producer',
              isLive: 'isLive',
            },
            prepare({ title, time, producer, isLive }: { 
              title: string; 
              time: string; 
              producer?: string; 
              isLive?: boolean 
            }) {
              return {
                title: title,
                subtitle: `${time} ${isLive ? `🎙️ ${producer || ''}` : '📻'}`,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'dayName',
      broadcasts: 'broadcasts',
    },
    prepare({ title, broadcasts }: { title: string; broadcasts?: unknown[] }) {
      return {
        title: title,
        subtitle: `${broadcasts?.length || 0} shows`,
      }
    },
  },
  orderings: [
    {
      title: 'Day Order',
      name: 'dayOrderAsc',
      by: [{ field: 'dayOrder', direction: 'asc' }],
    },
  ],
}


