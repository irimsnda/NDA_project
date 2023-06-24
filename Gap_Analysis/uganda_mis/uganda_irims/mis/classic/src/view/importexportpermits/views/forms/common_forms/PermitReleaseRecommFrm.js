/**
 * Created by Softclans on 1/26/2019.
 */
 Ext.define('Admin.view.importexportpermits.views.forms.common_forms.PermitReleaseRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'permitReleaseRecommFrm',
    layout: 'form',
    controller: 'importexportpermitsvctr',
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
    items: [
        {
            xtype: 'hiddenfield',
            name: 'recommendation_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name'
        },{
            xtype: 'hiddenfield',
            name: 'reference_no'
        },{
            xtype: 'hiddenfield',
            value: 1,
            name: 'is_payment_verified'
        },
       {
            xtype: 'hiddenfield',
            value: 1,allowBlank: true,
            name: 'is_permit_verified',
        },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-search',
            columnWidth: 0.1,
            margin:5,
            text: 'Preview Permit/Letter of Rejection',
            handler: 'generateimportpermitfromfrm',
            winWidth: '90%'
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Recommendation',
            name: 'decision_id',
            listeners: {
                change: function (cmb, newVal) {
                    var form = cmb.up('form'),
                        signatory = form.down('combo[name=dg_signatory]'),
                        permit_signatory = form.down('combo[name=permit_signatory]');
                    if (newVal == 1 || newVal === 1) {
                        signatory.setDisabled(false);
                    } else {
                        signatory.setDisabled(true);
                        permit_signatory.allowBlank = true;
                        permit_signatory.validate();
                        permit_signatory.reset();
                        permit_signatory.setVisible(false);
                    }
                },beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'par_approval_decisions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'datefield',
            fieldLabel: 'Approval Date',
            value: new Date(),
            maxValue: new Date(),
            name: 'approval_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'combo',
            store: 'confirmationstr',
            value: 1,
            fieldLabel: 'DG Signatory?',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            name: 'dg_signatory',
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        permit_signatory = form.down('combo[name=permit_signatory]');
                    if (newVal == 2 || newVal === 2) {
                        permit_signatory.setVisible(true);
                        permit_signatory.allowBlank = false;
                        permit_signatory.validate();
                    } else {
                        permit_signatory.setVisible(false);
                        permit_signatory.allowBlank = true;
                        permit_signatory.validate();
                    }
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Permit Signatory',
            margin: '0 20 20 0',
            name: 'permit_signatory',
            hidden: true,
            allowBlank: true,
            valueField: 'id',
            displayField: 'fullnames',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setUserCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'usermanagement/getActiveSystemUsers'
                        }
                    },
                    isLoad: true
                },
                beforequery: function (record) {
                    record.query = new RegExp(record.query, 'ig');
                    record.forceAll = true;
                }
            }
        },{
            xtype: 'textarea',
            fieldLabel: 'Permit Release/Rejection Remarks',
            name: 'permit_release_remarks',allowBlank: false
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Release Recommendation',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            name: 'save_recommendation'
        }
    ]
});