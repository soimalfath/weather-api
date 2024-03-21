import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ContentService {
  private URL: string;

  constructor() {
    this.URL = process.env.WP_API_BASE_URL;
  }

  async getPost() {
    try {
      const response = await axios.get(`${this.URL}/wp/v2/posts`);
      const data = await this.modifyPosts(response.data);
      const meta = {
        status: 'success',
        code: 200,
        message: 'Success get post data',
      };
      return { data, meta };
    } catch (error) {
      const meta = {
        status: 'error',
        code: error.response.data.status.code,
        message: error.response.data.message,
      };
      return { meta };
    }
  }

  private async modifyPosts(data: any): Promise<any[]> {
    const modifiedData = await Promise.all(
      data.map(async (item: any) => {
        const categories = await this.defineCategories(item.categories);
        const featuredMedia = await this.defineFeaturedMedia(
          item.featured_media,
        );
        const tags = await this.defineTags(item.tags);

        return {
          date: item.date,
          content: item.excerpt.rendered,
          id: item.id,
          categories: categories,
          tags: tags,
          title: item.title.rendered,
          status: item.status,
          featured_media: featuredMedia,
          link: item.link,
        };
      }),
    );
    return modifiedData;
  }

  private async defineCategories(categories: any): Promise<any[]> {
    if (!categories || categories.length === 0) {
      return [];
    }

    const promises = categories.map(async (categoryId: any) => {
      try {
        const response = await axios.get(
          `${this.URL}/wp/v2/categories/${parseInt(categoryId, 10)}`,
        );
        return response.data.name;
      } catch (error) {
        console.error(`Error while fetching category: ${error.message}`);
        return null;
      }
    });

    return await Promise.all(promises);
  }

  private async defineFeaturedMedia(mediaId: any): Promise<any> {
    if (!mediaId) {
      return null;
    }

    try {
      const response = await axios.get(`${this.URL}/wp/v2/media/${mediaId}`);
      return response.data.guid.rendered;
    } catch (error) {
      console.error(`Error while fetching featured media: ${error.message}`);
      return null;
    }
  }

  private async defineTags(tags: any): Promise<any[]> {
    if (!tags || tags.length === 0) {
      return [];
    }

    const promises = tags.map(async (tagId: any) => {
      try {
        const response = await axios.get(
          `${this.URL}/wp/v2/tags/${parseInt(tagId, 10)}`,
        );
        return response.data.name;
      } catch (error) {
        console.error(`Error while fetching tag: ${error.message}`);
        return null;
      }
    });

    return await Promise.all(promises);
  }
}
