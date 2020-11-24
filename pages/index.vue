<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card flat outlined class="mt-12" :loading="loading">
        <v-card-title class="headline">
          <h1 class="text-h3 text-uppercase">Spam escape</h1>
        </v-card-title>
        <v-img
          height="200px"
          contain
          src="/email_delivery.svg"
        />
        <v-card-subtitle>
          Escape the spam folder by cleaning your address list.
        </v-card-subtitle>
        <v-card-text>
          <v-form v-model="isValid">
            <v-text-field
              v-model="model.emailAddress"
              :rules="[rules.required, rules.email]"
              label="E-mail address"
              persistent-hint
              hint=""
              placeholder="Check an email address"
              outlined
              aria-autocomplete="none"
            />
          </v-form>
        </v-card-text>
        <v-card-text v-if="result">
          <v-card outlined dark>
            <v-row>
              <v-col cols="12" md="8">
                <v-card-title>
                  <h2 class="text-h3">
                    <template v-if="result.wellFormed && result.validDomain && result.validMailbox">Perfect!</template>
                    <template v-if="result.wellFormed && result.validDomain && !result.validMailbox">Probably good!
                    </template>
                    <template v-if="result.wellFormed && !result.validDomain && !result.validMailbox">Probably spam
                    </template>
                    <template v-if="!result.wellFormed && !result.validDomain && !result.validMailbox">Probably spam
                    </template>
                  </h2>
                </v-card-title>
                <v-card-subtitle>
                  Validation results for email {{ model.emailAddress }}
                </v-card-subtitle>
                <v-card-text>
                  <v-list
                    two-line
                    subheader
                  >
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon v-if="result.wellFormed" color="success">
                          mdi-check
                        </v-icon>
                        <v-icon v-else color="error">
                          mdi-alert-circle-outline
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Is well formed?</v-list-item-title>
                        <v-list-item-subtitle v-if="result.wellFormed">The email address seems to be valid.
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-else>The email address doesn't seem to be valid.</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon v-if="result.validDomain" color="success">
                          mdi-check
                        </v-icon>
                        <v-icon v-else color="error">
                          mdi-alert-circle-outline
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>It the domain valid?</v-list-item-title>
                        <v-list-item-subtitle v-if="result.validDomain">The domain seems to be valid.
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-else>The domain isn't valid.</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon v-if="result.validMailbox" color="success">
                          mdi-check
                        </v-icon>
                        <v-icon v-else color="error">
                          mdi-alert-circle-outline
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Is the mail box exists?</v-list-item-title>
                        <v-list-item-subtitle v-if="result.validMailbox">The mail box exists on the mail server.
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-else>The mail box may not exists on the mail server.
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="4" align-self="center" align="bottom">
                <v-img :src="checkResultImage" contain height="200"/>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="success"
            outlined
            x-large
            :disabled="!isValid || loading"
            @click="validateEmail"
          >
            <v-icon left>mdi-check</v-icon>
            Check email address
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      loading: false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
      model: {
        emailAddress: ''
      },
      result: null
    };
  },
  computed: {
    checkResultImage() {
      if (this.result) {
        if (this.result.isValid) {
          return '/check_ok.svg';
        } else if (this.result.wellFormed) {
          return '/check_warn.svg';
        } else {
          return '/check_fail.svg';
        }
      }
    }
  },
  methods: {
    async validateEmail() {
      this.loading = true;
      this.result = null;
      try {
        this.result = await this.$axios.$post(`/api/check?email=${this.model.emailAddress}`)
      } catch (e) {

      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
