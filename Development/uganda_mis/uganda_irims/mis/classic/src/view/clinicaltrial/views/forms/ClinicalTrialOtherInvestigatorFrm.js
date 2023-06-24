/**
 * Created by Kip on 1/19/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialOtherInvestigatorFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialotherinvestigatorfrm',
    controller: 'clinicaltrialvctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        labelAlign: 'top',
        margin: 3
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'personnel_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        }, {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'combo',
            name: 'category_id',
            allowBlank: false,
            fieldLabel: 'Investigator Category',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'category_name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                model_name: 'InvestigatorCategory'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            name: 'study_site_id',
            fieldLabel: 'Study Site(Optional)',
            queryMode: 'local',
            allowBlank: true,
            forceSelection: true,
            valueField: 'study_site_id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'clinicaltrial/getClinicalStudySites'
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var form = this.up('form'),
                        application_id = form.down('hiddenfield[name=application_id]').getValue(),
                        store = this.getStore();
                    store.removeAll();
                    store.load({params: {application_id: application_id}});
                }
            }
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            formBind: true,
            storeID: 'clinicaltrialotherinvestigatorsstr',
            handler: 'addApplicationOtherInvestigator'
        }
    ]
});