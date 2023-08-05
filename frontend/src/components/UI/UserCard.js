import React from "react";
import { Card, CardHeading, CardData, CardItem } from "./Card";
import { Checkbox } from "antd";
import { styled } from "styled-components";

const WhiteCheckbox = styled(Checkbox)`
  color: white;
`;
export const UserCard = (props) => {
  const { userChanges, handleFieldChange } = props;
    const { _id, name, firstName, lastName, email, isAdmin } = props.user;

  return (
    <Card className="m-2">
      <CardHeading>{name ? name : firstName + " " + lastName}</CardHeading>
      <CardData>
        <CardItem>{email}</CardItem>
        <CardItem>
          <WhiteCheckbox
            checked={userChanges[_id]?.isAdmin ?? isAdmin}
            onChange={(e) =>
              handleFieldChange(_id, "isAdmin", e.target.checked)
            }
          >
            {isAdmin ? "remove admin" : "make admin"}
          </WhiteCheckbox>
        </CardItem>
      </CardData>
    </Card>
  );
};

export default UserCard;
