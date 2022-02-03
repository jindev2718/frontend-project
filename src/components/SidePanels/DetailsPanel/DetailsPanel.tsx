import { observer } from "mobx-react";
import { FC } from "react";
import { Elem } from "../../../utils/bem";
import { AnnotationHistory } from "../../CurrentEntity/AnnotationHistory";
import { PanelBase, PanelProps } from "../PanelBase";
import "./DetailsPanel.styl";
import { RegionItem } from "./RegionItem";
import { Relations } from "./Relations";

interface DetailsPanelProps extends PanelProps {
  regions: any;
  selection: any;
}

const DetailsPanelComponent: FC<DetailsPanelProps> = ({ currentEntity, regions, ...props }) => {
  const selectedRegions = regions.selection;

  return (
    <PanelBase {...props} name="details" title="Details">
      <Content selection={selectedRegions} currentEntity={currentEntity} />
    </PanelBase>
  );
};

const Content: FC<any> = observer(({
  selection,
  currentEntity,
}) => {
  console.log({ selection, currentEntity });

  return (
    <>
      {selection.size ? (
        <RegionsPanel regions={selection}/>
      ) : (
        <GeneralPanel currentEntity={currentEntity}/>
      )}
    </>
  );
});

const GeneralPanel: FC<any> = observer(({ currentEntity }) => {
  const { relationStore } = currentEntity;

  return (
    <>
      <Elem name="section">
        <Elem name="section-head">
            Annotation History

          <span>#{currentEntity.pk ?? currentEntity.id}</span>
        </Elem>
        <Elem name="section-content">
          <AnnotationHistory inline/>
        </Elem>
      </Elem>
      <Elem name="section">
        <Elem name="section-head">
          Relations ({relationStore.size})
        </Elem>
        <Elem name="section-content">
          <Relations
            relationStore={relationStore}
          />
        </Elem>
      </Elem>
    </>
  );
});

const RegionsPanel: FC<{regions:  any}> = observer(({
  regions,
}) => {
  console.log({ regions });
  return (
    <div>
      {regions.list.map((reg: any) => {
        return (
          <RegionItem key={reg.id} region={reg}/>
        );
      })}
    </div>
  );
});

export const DetailsPanel = observer(DetailsPanelComponent);