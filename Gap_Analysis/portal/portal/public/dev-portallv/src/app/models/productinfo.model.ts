export interface paramsMdl {
    id: number;
    name: string;
    description: string;
}

export interface productApplicationMdl {
    appsection_id: number;
    section_name:string;
    sub_module_id: number;
    app_title: string;
}
export interface productInformationMdl{
    product_id:number;
    assessment_procedure_id: string;
    section_id: number;
    brand_name: string;

}
export interface ProductDataResponse{
    message: string;
    product_id:number;
    reference_no: string;
}
export interface ProductApplicationtData{
    product_id:number;
    reference_no: string;

}
export interface ingredientsDataMdl{
    ingredient_id:number;
    ingredient_name: string;
    specification_id: string;
    strength: string;
    si_units: string;
    reason_for_inclusion: string;
}
export interface packagingDataMdl{
    primary_container:number;
    material_id: string;
    retail_packaging_size: string;
    packaging_units_id:number;
    unit_pack:string;
}
export interface sampleDataMdl{
    brand_name:string;
    common_name: string;
    classification: string;
    classification_id:number;
}
export interface productManufacturerMdl{
    name:string;
    manufacturing_id:number;
    country:string;
    region:string;
    physical_address: string;
    postal_address: string;
    inspection_date: string;
    expiry_date: string;
    complaince_status: string;


}
export interface productImagesMdl{
        image:string,
        description: string;
        remarks: string;

}
export interface productLocalAgentMdl{
    local_agent:string,
    country: string;
    region: string;
    physical_address: string;
    
}
