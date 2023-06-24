/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrRegistryEligibilityCriteriaFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrregistryeligibilitycriteriafrm',
    layout: 'column',
    defaults: {
        
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top',
        allowBlank: true
    },
    autoScroll: true,
    bodyPadding: 5,
    listeners: {
        afterrender: function () {
            /*
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
            */
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },{
            xtype: 'textarea',
            fieldLabel: 'List Inclusion criteria ',
            name: 'inclusion_criteria',
        },{
            xtype: 'textarea',
            fieldLabel: 'List Exclusion criteria ',
            name: 'exclusion_criteria',
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Age group',
            name: 'age_groups',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_age_groups'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Sex',
            name: 'sex_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_sexdetails'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Minimum Age',columnWidth:0.25,
            name: 'minimum_age',
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Min Age Duration',columnWidth:0.25,
            name: 'minage_duration_desc',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_timespan_defination'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Maximum Age',columnWidth:0.25,
            name: 'maximum_age',
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Max Age Duration',columnWidth:0.25,
            name: 'maxage_duration_desc',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_timespan_defination'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
    ]
});