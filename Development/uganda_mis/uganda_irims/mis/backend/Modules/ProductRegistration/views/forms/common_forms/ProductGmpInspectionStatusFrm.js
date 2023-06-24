
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductGmpInspectionStatusFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productgmpinspectionstatusfrm',
    itemId: 'productgmpinspectionstatusfrm',
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        allowBlank: false,
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },
     {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_productgmp_inspectionstatuses'
    },   {
        xtype: 'combo',
        name: 'inspection_status_id',
        allowBlank: false,
        fieldLabel: 'GMP Inspection Status',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_gmpinspections_statuses'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        name: 'compliance_status_id',
        allowBlank: true,
        fieldLabel: 'GMP Compliance Status(if Inspected)',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_gmpapproval_decisions'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textarea',
        name: 'gmp_inspection_conducted_by', 
        fieldLabel: 'GMP Inspection Conducted By',
        
    },{
        xtype: 'textarea',
        name: 'remarks', 
        fieldLabel: 'Assessment Remarks',
        
    }],//
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save GMP Inspection Status',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_productgmp_inspectionstatuses',
                storeID: 'productGmpInspectionDetailsStr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveGmpproductStatusesdetails'
            }
        ]
    }
    ]
});             
