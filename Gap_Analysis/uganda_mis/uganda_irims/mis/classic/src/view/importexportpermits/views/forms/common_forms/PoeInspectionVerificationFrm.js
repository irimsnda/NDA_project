/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.PoeInspectionVerificationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'poeinspectionverificationfrm',
    layout: 'form',
    frame: true,
    controller: 'importexportpermitsvctr',
    defaults: {
        allowBlank: false,
        labelStyle: 'font-weight:bold'
    },
    fieldDefaults: {
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    },
    items: [{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Verification',
            name: 'permit_verificationstatus_id',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'par_poeinspection_verificationrecommends',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }
           
        }, 
        {
            xtype: 'textarea',
            fieldLabel: 'Remarks',
            name: 'verification_remarks',
            allowBlank: true
        },{
            xtype:'hiddenfield',
            name:'active_application_code'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Inspection Verification',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            name:'save_recommendation'
        }
    
    ]
});