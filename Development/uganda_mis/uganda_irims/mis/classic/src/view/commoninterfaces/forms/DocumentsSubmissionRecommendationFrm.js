/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.commoninterfaces.views.forms.common_forms.DocumentsSubmissionRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'documentssubmissionrecommendationfrm',
    controller: 'productregistrationvctr',
    layout: 'form',
    frame: true,
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
    items: [ {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },{
            xtype: 'hiddenfield',
            name: 'module_id'
        }, {
            xtype: 'combo',
            name: 'document_status_id',
            allowBlank: true,forceSelection:true,
            fieldLabel: 'Document Submission Statuses',
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosProdSampleNonfilterStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_documentssubmission_statuses'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'textarea',
            fieldLabel: 'Remarks',
            name: 'remarks',
            allowBlank: true
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Documents Submission Remarks',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            name:'btn_remarks',
            handler: 'savesamplesubmissionremarks'
        },
        {
            xtype: 'button',
            text: 'Clear',
            ui: 'soft-purple',
            hidden: true,
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});