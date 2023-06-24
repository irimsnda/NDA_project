/**
 * Created by Kip on 7/11/2019.
 */
Ext.define('Admin.view.premiseregistration.views.forms.GcpInspectionApprovalfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gcpinspectionapprovalfrm',
    controller: 'clinicaltrialvctr',
    frame: true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.33,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'record_id'
        },{
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'combo',
            name: 'approval_recommendation_id',
            fieldLabel: 'Approval Recommendation',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gmpapproval_decisions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textarea',
            name: 'approval_remarks',
            columnWidth: 1,
            fieldLabel: 'Approval Remarks',
            allowBlank: true
        }
    ],
    buttons: [
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            handler: 'doSaveInspectionDetails',
            storeId: 'ctrgcpinspectionschedulegridstr',
            action_url: 'clinicaltrial/saveGcpInspectionApproval',
            table_name: 'tra_clinical_trial_applications',
        }
    ]
});