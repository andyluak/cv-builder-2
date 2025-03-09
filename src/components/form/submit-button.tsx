import { Button } from "@/components/ui/button";

type Props = {};

function SubmitButton({}: Props) {
  return (
    <Button type='submit' className='self-start'>
      Submit
    </Button>
  );
}

export default SubmitButton;
