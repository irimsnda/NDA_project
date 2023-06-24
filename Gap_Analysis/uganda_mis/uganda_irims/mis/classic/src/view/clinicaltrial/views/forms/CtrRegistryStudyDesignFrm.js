/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrRegistryStudyDesignFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrregistrystudydesignfrm',
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
            name: 'isReadOnly',
            value:0
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Intervention Assignment',
            name: 'intervention_assignment_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_intervention_assignment'
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
            fieldLabel: 'Allocation to intervention',
            name: 'intervention_allocation_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_intervention_allocation'
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
            fieldLabel: 'if randomised, describe how the allocation sequence was generated',
            name: 'sequence_generation_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_sequence_generation'
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
            fieldLabel: 'Describe how the allocation sequence/code was concealed from the person allocating the participants to the intervention arms',
            name: 'allocation_sequence_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_allocation_sequence'
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
            fieldLabel: 'Masking',
            name: 'masking_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_maskingbinding'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'tagfield',
            columnWidth: 0.99,
            fieldLabel: 'If Masking / blinding was used ',
            name: 'masking_used_id',
            allowBlank: false,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            growMax: 100,
            queryMode: 'local',
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
                                table_name: 'par_clinical_masking_used'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
    ]
});