
export function RandomFloat(floor: number, ceiling: number):number {
    return Math.random() * (ceiling - floor) + floor;
}

export function extractCodeFromUrl(url: string): string {
    const match = url.match(/code=([^&]+)/);
    console.log(match);
    if (match) {
      return match[1];
    } else {
      throw new Error('Code not found in URL');
    }
  }
