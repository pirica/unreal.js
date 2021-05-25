import { FGuid } from "../../objects/core/misc/Guid";
import { UScriptStruct } from "./UScriptStruct";
import { FAssetArchive } from "../reader/FAssetArchive";
import { EObjectFlags } from "../../objects/uobject/EObjectFlags";
import { FPropertyTag } from "../objects/FPropertyTag";
import { deserializeUnversionedProperties } from "../../objects/uobject/UnversionedPropertySerialization";
import { deserializeVersionedTaggedProperties } from "./UObject";

export enum EUserDefinedStructureStatus {
    /** Struct is in an unknown state. */
    UDSS_UpToDate,
    /** Struct has been modified but not recompiled. */
    UDSS_Dirty,
    /** Struct tried but failed to be compiled. */
    UDSS_Error,
    /** Struct is a duplicate, the original one was changed. */
    UDSS_Duplicate
}

export class UUserDefinedStruct extends UScriptStruct {
    public Status = EUserDefinedStructureStatus.UDSS_UpToDate
    public Guid: FGuid

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos);
        if (this.hasAnyFlags(EObjectFlags.RF_ClassDefaultObject))
            return
        if (false && this.Status === EUserDefinedStructureStatus.UDSS_UpToDate) {
            // UScriptStruct::SerializeItem
            let defaultProperties: FPropertyTag[] = [] // TODO should we save this?
            if (Ar.useUnversionedPropertySerialization) {
                defaultProperties = deserializeUnversionedProperties(defaultProperties, this, Ar)
            } else {
                defaultProperties = deserializeVersionedTaggedProperties(defaultProperties, Ar)
            }
        }
    }
}