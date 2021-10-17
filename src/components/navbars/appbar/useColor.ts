import {PropTypes} from "@material-ui/core";
import {useState} from "react";
import { useAsync } from '../../../hooks/useAsync'
import { sleep } from '../../../utils/sleep'

export const useColor = (isScrolledToTop: boolean): PropTypes.Color => {
  const [color, setColor] = useState<PropTypes.Color>(isScrolledToTop ? 'primary' : 'inherit');

  useAsync(async () => {
    if (!isScrolledToTop)
      await sleep(100);

    setColor(isScrolledToTop ? 'primary' : 'inherit')
  }, [isScrolledToTop]);

  return color;
}