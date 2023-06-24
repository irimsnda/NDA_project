/**
 * Created by Kip on 1/19/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrRegistryOutcomesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrregistryoutcomesfrm',
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
            name: 'application_id'
        }, {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'combo',
            name: 'outcome_type_id',
            allowBlank: false,
            fieldLabel: 'Outcome Type',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinicaloutcome_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            fieldLabel:'Time Point',
            name:'time_point',
            xtype:'textarea'

        },{
            xtype:'textarea',
            fieldLabel:'Outcome ',
            name:'outcome'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            handler: 'doCreateClinicalTrialParamWin',
            action_url: 'clinicaltrial/onSaveOutcomesDetails',
            table_name: 'tra_clinicaltrial_outcomes',
            storeID: 'onlineclinicaltrialoutcomesgridstr',
        }
    ]
});