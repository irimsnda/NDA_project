/**
 * Created by Kip on 1/17/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialOtherDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialotherdetailsfrm',
    layout: 'column',
    bodyPadding: 5,
    defaults:{
        columnWidth: 0.3,
        labelAlign: 'top',
        margin: 5,
        allowBlank: false
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Study Duration',
            name: 'study_duration',
            minValue: 1
        },
        {
            xtype: 'combo',
            name: 'duration_desc',
            allowBlank: false,
            fieldLabel: 'Duration Description',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                model_name: 'DurationDescription'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'NIMR-Ethical Clearance No',
            name: 'clearance_no'
        }
    ]
});