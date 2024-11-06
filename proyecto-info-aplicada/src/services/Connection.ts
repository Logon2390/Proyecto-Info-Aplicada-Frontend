import axios from "axios";
export const Connection = {
  startMining: (blockId: string) => {
    axios
      .post("https://localhost:7253/api/Blocks/mineBlock?blockId=" + blockId)
      .then((res) => {
      });
  },
};
