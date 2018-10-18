import React from "react";

import { addDecorator } from "@storybook/react";
import confirmButtonStories from "./ConfirmButtonStories";
import messageListStories from "./MessageListStories";
import onflineIconStories from "./OnflineIconStories";
import PesquisaOcorrenciasStories from "./PesquisaOcorrenciasStories";

addDecorator(story => <div style={{ margin: "20px" }}>{story()}</div>);

confirmButtonStories();
messageListStories();
onflineIconStories();
PesquisaOcorrenciasStories();
