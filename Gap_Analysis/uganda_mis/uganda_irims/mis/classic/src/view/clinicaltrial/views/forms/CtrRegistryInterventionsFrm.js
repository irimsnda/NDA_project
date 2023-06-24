/**
 * Created by Kip on 1/19/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrRegistryInterventionsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrregistryinterventionsfrm',
    controller: 'clinicaltrialvctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
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
            name: 'intervention_type_id',
            allowBlank: false,
            fieldLabel: 'Intervention Type',
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
                                table_name: 'par_clinical_intervention_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            fieldLabel:'Intervention Type',
            name:'intervention_name',
            xtype:'textfield'

        },{
            xtype: 'textfield',
            fieldLabel: 'Dose (How much or how often)',
            name: 'intervention_dose',
        },{
            fieldLabel:'Duration (for how long) ',
            name:'intervention_duration',
            xtype:'textfield'

        },{
            fieldLabel:'Group Size ',
            name:'group_size',
            xtype:'textfield'
        },{
            xtype: 'combo',
            name: 'nature_ofcontrol_id',
            allowBlank: false,
            fieldLabel: 'Nature of control ',
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
                                table_name: 'par_clinical_natureofcontrols'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'textarea',
            fieldLabel:'Intervention Description ',
            name:'intervention_description'
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
            action_url: 'clinicaltrial/onSaveInterventionDetails',
            table_name: 'tra_clinicaltrial_interventions',
            storeID: 'onlineclinicaltrialinterventionsgridstr',
        }
    ]
});